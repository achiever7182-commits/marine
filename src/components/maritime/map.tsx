import { useEffect, useRef } from "react";
import { corridors, ports, vessels, type VesselKind } from "@/lib/maritime";

const shipClass: Record<VesselKind, string> = {
  Container: "vessel-container",
  Tanker: "vessel-tanker",
  Cargo: "vessel-cargo",
  Passenger: "vessel-passenger",
};

export type MaritimeMapProps = {
  selectedId: string;
  position?: { lat: number; lon: number } | null;
  track?: [number, number][];
  futureTrack?: [number, number][];
  onSelect: (id: string) => void;
  showPorts?: boolean;
  showCorridors?: boolean;
  focusPort?: string | null;
};

export default function MaritimeMap({
  selectedId,
  position,
  track = [],
  futureTrack = [],
  onSelect,
  showPorts = true,
  showCorridors = false,
  focusPort,
}: MaritimeMapProps) {
  const element = useRef<HTMLDivElement>(null);
  const mapRef = useRef<{ map: import("leaflet").Map; layer: import("leaflet").LayerGroup } | null>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    let disposed = false;
    let resizeObserver: ResizeObserver | undefined;
    void import("leaflet").then((module) => {
      if (disposed || !element.current || mapRef.current) return;
      const L = module.default;
      const map = L.map(element.current, { zoomControl: false, attributionControl: true, minZoom: 2 }).setView([24, 12], 2);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
        maxZoom: 18,
      }).addTo(map);
      const layer = L.layerGroup().addTo(map);
      mapRef.current = { map, layer };
      resizeObserver = new ResizeObserver(() => map.invalidateSize());
      resizeObserver.observe(element.current);
    });
    return () => {
      disposed = true;
      resizeObserver?.disconnect();
      mapRef.current?.map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const current = mapRef.current;
    if (!current) return;
    void import("leaflet").then((module) => {
      const L = module.default;
      const { map, layer } = current;
      layer.clearLayers();

      if (showCorridors) {
        for (const corridor of corridors) {
          L.polyline(corridor.route, { color: "var(--route-corridor)", weight: 2, opacity: 0.55, dashArray: "5 8" }).addTo(layer);
        }
      }
      const selected = vessels.find((item) => item.id === selectedId);
      if (selected) {
        const historic = track.length ? track : [[selected.lat - 1, selected.lon - 2], [selected.lat, selected.lon]] as [number, number][];
        L.polyline(historic, { color: "var(--signal-cyan)", weight: 3, opacity: 0.9 }).addTo(layer);
        if (futureTrack.length > 1) {
          L.polyline(futureTrack, { color: "var(--signal-cyan)", weight: 12, opacity: 0.1 }).addTo(layer);
          L.polyline(futureTrack, { color: "var(--signal-cyan)", weight: 2.5, opacity: 0.9, dashArray: "8 8" }).addTo(layer);
          futureTrack.slice(1, -1).forEach((point) => {
            L.circleMarker(point, { radius: 3, color: "var(--signal-cyan)", weight: 1, fillOpacity: 1 }).addTo(layer);
          });
        }
      }
      if (showPorts) {
        for (const port of ports) {
          const marker = L.circleMarker([port.lat, port.lon], {
            radius: focusPort === port.name ? 7 : 4,
            color: focusPort === port.name ? "var(--signal-amber)" : "var(--signal-green)",
            weight: 1,
            fillOpacity: 0.8,
          }).bindTooltip(`<strong>${port.name}</strong><br/>DEMO · Congestion ${port.index}`).addTo(layer);
          if (focusPort === port.name) marker.openTooltip();
        }
      }
      for (const vessel of vessels) {
        const coords = vessel.id === selectedId && position ? [position.lat, position.lon] as [number, number] : [vessel.lat, vessel.lon] as [number, number];
        const icon = L.divIcon({
          className: "vessel-map-icon",
          html: `<span class="vessel-glyph ${shipClass[vessel.type]} ${vessel.id === selectedId ? "is-selected" : ""}" style="--marker-heading:${vessel.heading}deg" aria-label="${vessel.name}"></span>`,
          iconSize: [18, 18],
          iconAnchor: [9, 9],
        });
        L.marker(coords, { icon, zIndexOffset: vessel.id === selectedId ? 800 : 0 })
          .on("click", () => onSelectRef.current(vessel.id))
          .bindTooltip(`${vessel.name} · ${vessel.type}`, { direction: "top" })
          .addTo(layer);
      }
      const destination = ports.find((port) => port.name === selected?.destination);
      if (destination && selected && (futureTrack.length || focusPort)) {
        L.circleMarker([destination.lat, destination.lon], { radius: 6, color: "var(--signal-amber)", weight: 2, fillOpacity: 0.45 }).bindTooltip(`ETA · ${destination.name}`).addTo(layer);
      }
    });
  }, [selectedId, position, track, futureTrack, onSelect, showPorts, showCorridors, focusPort]);

  useEffect(() => {
    if (!mapRef.current) return;
    const selected = vessels.find((item) => item.id === selectedId);
    if (focusPort) {
      const port = ports.find((item) => item.name === focusPort);
      if (port) mapRef.current.map.flyTo([port.lat, port.lon], 5, { duration: 0.8 });
    } else if (selected) {
      mapRef.current.map.panTo(position ? [position.lat, position.lon] : [selected.lat, selected.lon], { animate: true, duration: 0.55 });
    }
  }, [selectedId, position, focusPort]);

  return <div className="map-canvas" ref={element} aria-label="Interactive maritime vessel map" />;
}