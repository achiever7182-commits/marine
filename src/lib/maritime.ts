export type VesselKind = 'Container' | 'Tanker' | 'Cargo' | 'Passenger';
export type TemporalMode = 'PAST' | 'LIVE' | 'FUTURE';
export interface Vessel { id: string; name: string; mmsi: string; imo: string; type: VesselKind; flag: string; lat: number; lon: number; speed: number; heading: number; destination: string; origin: string; length: number; width: number; status: string; }
export interface Port { name: string; country: string; lat: number; lon: number; index: number; waiting: number; waitHours: number; trend: number; }
export interface TrackPoint { lat: number; lon: number; hoursAgo: number; speed: number; heading: number; }
export interface Prediction { lat: number; lon: number; speed: number; heading: number; distance: number; confidence: string; eta: string; }

export const ports: Port[] = [
  { name:'Rotterdam', country:'Netherlands', lat:51.95, lon:4.14, index:72, waiting:18, waitHours:8.4, trend:5 },
  { name:'Singapore', country:'Singapore', lat:1.26, lon:103.82, index:64, waiting:24, waitHours:6.2, trend:-3 },
  { name:'Shanghai', country:'China', lat:31.23, lon:121.48, index:81, waiting:31, waitHours:12.1, trend:8 },
  { name:'Los Angeles', country:'United States', lat:33.74, lon:-118.27, index:58, waiting:12, waitHours:5.6, trend:-2 },
  { name:'Jebel Ali', country:'United Arab Emirates', lat:24.99, lon:55.06, index:43, waiting:9, waitHours:4.1, trend:2 },
  { name:'Hamburg', country:'Germany', lat:53.54, lon:9.99, index:49, waiting:11, waitHours:4.8, trend:-1 },
];

export const vessels: Vessel[] = [
  { id:'v1', name:'Maersk Eindhoven', mmsi:'220417000', imo:'9456782', type:'Container', flag:'DK', lat:12.4, lon:54.2, speed:16.8, heading:312, destination:'Rotterdam', origin:'Singapore', length:399, width:59, status:'Under way' },
  { id:'v2', name:'Pacific Horizon', mmsi:'636018420', imo:'9784216', type:'Tanker', flag:'LR', lat:19.8, lon:65.1, speed:12.2, heading:286, destination:'Jebel Ali', origin:'Singapore', length:274, width:48, status:'Under way' },
  { id:'v3', name:'Ever Given', mmsi:'353136000', imo:'9811000', type:'Container', flag:'PA', lat:29.7, lon:32.4, speed:4.1, heading:25, destination:'Rotterdam', origin:'Shanghai', length:400, width:59, status:'Restricted manoeuvrability' },
  { id:'v4', name:'Atlantic Trader', mmsi:'311000873', imo:'9312248', type:'Cargo', flag:'BS', lat:36.2, lon:-43.7, speed:14.3, heading:55, destination:'Hamburg', origin:'Los Angeles', length:225, width:32, status:'Under way' },
  { id:'v5', name:'Queen Mary 2', mmsi:'310627000', imo:'9241061', type:'Passenger', flag:'BM', lat:46.1, lon:-34.5, speed:19.5, heading:78, destination:'New York', origin:'Southampton', length:345, width:41, status:'Under way' },
  { id:'v6', name:'Norden', mmsi:'477832100', imo:'9697427', type:'Tanker', flag:'HK', lat:-13.4, lon:74.1, speed:10.8, heading:298, destination:'Singapore', origin:'Cape Town', length:183, width:32, status:'Under way' },
  { id:'v7', name:'Hansa Europe', mmsi:'218722000', imo:'9417720', type:'Cargo', flag:'DE', lat:57.1, lon:2.4, speed:11.1, heading:184, destination:'Rotterdam', origin:'Hamburg', length:178, width:28, status:'Under way' },
  { id:'v8', name:'Oriental Pearl', mmsi:'477119700', imo:'9631228', type:'Container', flag:'HK', lat:4.1, lon:111.7, speed:17.2, heading:337, destination:'Shanghai', origin:'Singapore', length:366, width:51, status:'Under way' },
  { id:'v9', name:'Gulf Navigator', mmsi:'538006412', imo:'9673132', type:'Tanker', flag:'MH', lat:25.2, lon:57.0, speed:0.4, heading:0, destination:'Jebel Ali', origin:'Basra', length:250, width:44, status:'At anchor' },
  { id:'v10', name:'Southern Cross', mmsi:'636019112', imo:'9407115', type:'Cargo', flag:'LR', lat:-36.7, lon:20.4, speed:13.2, heading:44, destination:'Rotterdam', origin:'Cape Town', length:199, width:30, status:'Under way' },
  { id:'v11', name:'Coastal Spirit', mmsi:'367721460', imo:'9028404', type:'Passenger', flag:'US', lat:33.4, lon:-122.9, speed:8.6, heading:125, destination:'Los Angeles', origin:'San Francisco', length:142, width:24, status:'Under way' },
  { id:'v12', name:'Blue Meridian', mmsi:'538009104', imo:'9631228', type:'Container', flag:'MH', lat:35.2, lon:141.8, speed:15.9, heading:241, destination:'Los Angeles', origin:'Shanghai', length:352, width:48, status:'Under way' },
];

export const histories: Record<string, TrackPoint[]> = {
  v1: [{lat:5.9,lon:73.8,hoursAgo:24,speed:16.1,heading:297},{lat:8.1,lon:67.4,hoursAgo:18,speed:16.4,heading:301},{lat:9.9,lon:63.1,hoursAgo:12,speed:16.8,heading:306},{lat:11.1,lon:58.7,hoursAgo:6,speed:17.2,heading:308},{lat:12.4,lon:54.2,hoursAgo:0,speed:16.8,heading:312}],
  v2: [{lat:15.5,lon:76.1,hoursAgo:24,speed:12.5,heading:285},{lat:16.7,lon:72.9,hoursAgo:18,speed:12.1,heading:284},{lat:17.8,lon:69.8,hoursAgo:12,speed:12.3,heading:287},{lat:18.9,lon:67.3,hoursAgo:6,speed:12.2,heading:286},{lat:19.8,lon:65.1,hoursAgo:0,speed:12.2,heading:286}],
  v3: [{lat:29.1,lon:32.3,hoursAgo:24,speed:12.0,heading:28},{lat:29.2,lon:32.4,hoursAgo:18,speed:10.2,heading:27},{lat:29.4,lon:32.3,hoursAgo:12,speed:7.1,heading:26},{lat:29.6,lon:32.4,hoursAgo:6,speed:4.8,heading:25},{lat:29.7,lon:32.4,hoursAgo:0,speed:4.1,heading:25}],
};

export interface Corridor { name:string; region:string; traffic:string; utilization:number; risk:string; route:[number,number][]; }
export const corridors: Corridor[] = [
 {name:'Asia → Europe',region:'Suez / Indian Ocean',traffic:'1,284 vessels',utilization:78,risk:'Suez transit',route:[[1.26,103.82],[6,80],[12,56],[15,43],[21,39],[30,32],[36,15],[43,5],[51.95,4.14]]},
 {name:'Europe → North America',region:'North Atlantic',traffic:'612 vessels',utilization:54,risk:'North Atlantic weather',route:[[51.95,4.14],[48,-12],[45,-30],[42,-48],[40,-65]]},
 {name:'Asia → North America',region:'North Pacific',traffic:'938 vessels',utilization:68,risk:'Pacific crossing',route:[[31.23,121.48],[38,155],[42,178],[41,-160],[38,-140],[33.74,-118.27]]},
 {name:'Middle East → Europe',region:'Hormuz / Suez',traffic:'483 vessels',utilization:61,risk:'Hormuz transit',route:[[24.99,55.06],[25,57],[20,60],[15,50],[12,43],[21,39],[30,32],[36,15],[51.95,4.14]]},
 {name:'Indian Ocean',region:'Malacca / Cape route',traffic:'746 vessels',utilization:72,risk:'Malacca Strait',route:[[1.26,103.82],[0,87],[-8,65],[-17,45],[-30,30],[-34,19]]},
];

export const events = [
 {id:'departure',label:'Port departure',detail:'Left Singapore anchorage',hoursAgo:23.4,kind:'Departure'},
 {id:'speed',label:'Speed change',detail:'Speed adjusted to 16.8 kn',hoursAgo:16.2,kind:'Telemetry'},
 {id:'gap',label:'AIS signal gap',detail:'Brief telemetry gap · 18 min',hoursAgo:9.1,kind:'Signal'},
 {id:'course',label:'Course adjustment',detail:'Heading changed 12° to starboard',hoursAgo:4.3,kind:'Navigation'},
];

export const getVessel = (id:string) => vessels.find((v)=>v.id===id) ?? vessels[0];
export function getHistoricalPosition(vesselId:string, hoursAgo:number): TrackPoint | null {
  const track=histories[vesselId]; if (!track?.length || hoursAgo < 0 || hoursAgo > track[track.length-1].hoursAgo) return null;
  const index=track.findIndex((p)=>p.hoursAgo>=hoursAgo);
  if(index===0) return track[0];
  if(index<0) return track[track.length-1];
  const a=track[index-1]; const b=track[index]; if (!a || !b) return null; const ratio=(a.hoursAgo-hoursAgo)/(a.hoursAgo-b.hoursAgo);
  return {lat:a.lat+(b.lat-a.lat)*ratio,lon:a.lon+(b.lon-a.lon)*ratio,hoursAgo,speed:a.speed+(b.speed-a.speed)*ratio,heading:a.heading+(b.heading-a.heading)*ratio};
}
export function predictPosition(vessel:Vessel,hours:number):Prediction {
  const hoursSafe=Math.max(0,Math.min(hours,72));
  const target=ports.find((p)=>p.name===vessel.destination);
  const bearing=vessel.heading*Math.PI/180;
  const speed=vessel.status==='At anchor'?0:vessel.speed*(hoursSafe<=6?1:hoursSafe<=24?.88:.72);
  const distance=speed*hoursSafe;
  const deltaLat=(distance*Math.cos(bearing))/60;
  const lonScale=Math.max(.22,Math.cos(vessel.lat*Math.PI/180));
  const deltaLon=(distance*Math.sin(bearing))/(60*lonScale);
  let lat=Math.max(-84,Math.min(84,vessel.lat+deltaLat)); let lon=vessel.lon+deltaLon;
  if(target && hoursSafe>0){const targetDistance=greatCircleKm(vessel.lat,vessel.lon,target.lat,target.lon); const travelKm=distance*1.852; if(travelKm>targetDistance*.88){const blend=Math.min(.78,(travelKm/targetDistance-.72)*.48); lat=lat*(1-blend)+target.lat*blend; lon=lon*(1-blend)+target.lon*blend;}}
  while(lon>180)lon-=360; while(lon< -180)lon+=360;
  const uncertainty=hoursSafe<=3?'Higher':hoursSafe<=12?'Moderate':hoursSafe<=36?'Lower':'Significantly uncertain';
  const etaHours=target?greatCircleKm(lat,lon,target.lat,target.lon)/(Math.max(speed,1)*1.852):null;
  const eta=etaHours===null?'Route unknown':new Date(Date.now()+(hoursSafe+etaHours)*3600000).toISOString();
  return {lat,lon,speed:Math.round(speed*10)/10,heading:vessel.heading,distance,confidence:uncertainty,eta};
}
export function greatCircleKm(lat1:number,lon1:number,lat2:number,lon2:number):number {
 const rad=(n:number)=>n*Math.PI/180; const dLat=rad(lat2-lat1),dLon=rad(lon2-lon1); const a=Math.sin(dLat/2)**2+Math.cos(rad(lat1))*Math.cos(rad(lat2))*Math.sin(dLon/2)**2; return 6371*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}
export const demoMetrics = {totalVessels:14978,liveVessels:14326,estimatedVessels:652,ports:6,activeHubs:6,alerts:3,estimatedFleet:310000};
export const vesselCountByType = (type:VesselKind)=>vessels.filter((v)=>v.type===type).length;
