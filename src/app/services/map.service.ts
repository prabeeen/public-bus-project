import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { coordinate_data } from './coordinate_data';
import { busCoord } from './coordinate_data';
// import { Subscription } from 'rxjs';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  // title: string = 'angular-map-test';
  // subs: Subscription | undefined;
  map: any;
  long: number = 85.370201222954;
  lat: number = 27.696104646299773;
  style: string = 'mapbox://styles/mapbox/streets-v11?optimize=true';
  gpsTest: string = '';
  coord: number[] = [];
  geoCoordinate: Array<busCoord> = coordinate_data;

  constructor(private socketService: SocketService) {}
  // constructor() {}

   buildMap(){
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      center: [this.long, this.lat],
      zoom: 12,
      });

      this.map.addControl(new mapboxgl.NavigationControl());
      this.map.addControl(new mapboxgl.GeolocateControl({positionOptions: {enableHighAccuracy: true}, trackUserLocation: true, showUserHeading: true}));
      this.map.addControl(new mapboxgl.FullscreenControl());


      const marker = this.createMarker([this.long, this.lat])
      const marker2 = this.createMarker([85.3117, 27.7006])


      this.socketService.listen('receiveGPS').subscribe((data: any)=>{
          marker.setLngLat([data[0], data[1]]).addTo(this.map);
          console.log(data)
        })
      }

   private createMarker(longlat:[number, number]){
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
    });

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

  }

  //------------remove this------------------------------

  // const marker = new mapboxgl.Marker()
  // .setLngLat([this.long,this.lat])
  // .addTo(this.map)

  // const marker2 = new mapboxgl.Marker()
  // .setLngLat([85.3117, 27.7006])
  // .addTo(this.map);
