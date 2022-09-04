import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { coordinate_data } from './coordinate_data';
import { busCoord } from './coordinate_data';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})


export class MapService {
  map: any;
  long: number = 85.370201222954;
  lat: number = 27.696104646299773;
  style: string = 'mapbox://styles/mapbox/streets-v11?optimize=true';
  gpsTest: string = '';
  coord: number[] = [];
  geoCoordinate: Array<busCoord> = coordinate_data;

  //socket data
  driverObj:any = {};
  markerObj:any = {};

  constructor(private socketService: SocketService) {}

   buildMap(){
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      center: [this.long, this.lat],
      zoom: 13.5,
      });

      this.map.addControl(new mapboxgl.NavigationControl());
      this.map.addControl(new mapboxgl.GeolocateControl({positionOptions: {enableHighAccuracy: true}, trackUserLocation: true, showUserHeading: true}));
      this.map.addControl(new mapboxgl.FullscreenControl());


      const marker = this.createMarker([this.long, this.lat])
      // const marker2 = this.createMarker([85.3117, 27.7006])


      // this.socketService.listen('receiveGPS').subscribe((data: any)=>{
      //     marker.setLngLat([data[0], data[1]]).addTo(this.map);
      //     // console.log(data)
      //   })
      }

   private createMarker(longlat:[number,number]){
    const marker = new mapboxgl.Marker().setLngLat(longlat).addTo(this.map)
    return marker
   }

   drawRoute(busName: string){
    const sourceName = busName+'route';
    const busObject = this.geoCoordinate.filter((busCoord)=>{
      return busCoord.bus == busName;
    })

    this.map.on('load', () => {
      this.createLineSource(sourceName, busObject[0].coord);
      this.addLineSource(sourceName);
      this.createBounds(busObject[0].coord);
    });

   }

   private createBounds(coords:number[][]){
    const startcoord: [number,number] = coords[0] as [number,number]
    const bounds = new mapboxgl.LngLatBounds(startcoord, startcoord);

    for(const coord of coords){
      const co:[number,number] = coord as [number,number]
      bounds.extend(co);
    }

    this.map.fitBounds(bounds, {padding: 40})
   }

   private createLineSource(sourceName: string, pathCoordinate:number[][]){
    this.map.addSource(sourceName, {
      'type': 'geojson',
      'data': {
      'type': 'Feature',
      'properties': {},
      'geometry': {
      'type': 'LineString',
      'coordinates': pathCoordinate
      }
      }
      });
    }

    private addLineSource(sourceName: string){
      this.map.addLayer({
        'id': sourceName,
      'type': 'line',
      'source': sourceName,
      'layout': {
      'line-join': 'round',
      'line-cap': 'round'
      },
      'paint': {
      'line-color': 'rgba(255,0,0,0.8)',
      'line-width': 8
    }
      });
   }


   //Socket Services for receiver(passenger)

   getNewDriver(){
    this.socketService.listen("new-driver").subscribe((driverVal:any)=>{
      const driverUid:string = driverVal.uid;
      const driverName:string = driverVal.name;
      const initCoord:[number,number] = driverVal.initCoord;
      this.updateDataObj(driverUid, driverName, initCoord);
    })
   }

   private updateDataObj(uid: string, name: string, coord: [number,number]){
    this.driverObj[uid] = name;
    const marker = this.createMarker(coord);
    this.markerObj[uid] = marker;
   }

   checkDriverDisconnect(){
    this.socketService.listen("driver-disconnect").subscribe((driverUid:any)=>{
      console.log(`driver disconnect: ${driverUid}`)
      if(this.driverObj[driverUid])
      delete this.driverObj[driverUid]
      if(this.markerObj[driverUid])
      this.markerObj[driverUid].remove()
      if(this.markerObj[driverUid])
      delete this.markerObj[driverUid]
    })
   }

   getExistingDriver(){
    this.socketService.emit('get-driver', '');
    this.socketService.listen('get-driver').subscribe((data:any)=>{
    const entries = Object.entries(data);
      entries.map((val:any)=>{
        const driverUid: string = val[0];
        const driverName: string = val[1][0];
        const initCoord: [number, number] = val[1][1];
        this.updateDataObj(driverUid, driverName, initCoord);
      })
    })
   }

  }
