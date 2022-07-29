import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  // 27.6883814;
  // 85.3452235;
  map: any;
  title: string = 'angular-map-test';
  lat: number = 27.691799;
  long: number = 85.357067;
  style: string = 'mapbox://styles/mapbox/streets-v11?optimize=true';
  gpsTest: string = '';
  coord: number[] = [];
  subs: Subscription | undefined;

  constructor(private socketService: SocketService) {

   }

   buildMap(){
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      center: [this.long, this.lat],
      zoom: 16,
      });

      this.map.addControl(new mapboxgl.NavigationControl());
      this.map.addControl(new mapboxgl.GeolocateControl({positionOptions: {enableHighAccuracy: true}, trackUserLocation: true, showUserHeading: true}));
      this.map.addControl(new mapboxgl.FullscreenControl());

      const marker = new mapboxgl.Marker()
      .setLngLat([this.long,this.lat])
      .addTo(this.map)

      const marker2 = new mapboxgl.Marker()
      .setLngLat([85.3117, 27.7006])
      .addTo(this.map);

      this.socketService.listen('receiveGPS').subscribe((data: any)=>{
        marker.setLngLat([data[0], data[1]]).addTo(this.map);
        console.log(data)
      })

      this.map.on('click', this.onClick)
   }
   onClick(e:any){
    console.log([e.lngLat.lng, e.lngLat.lat])
  }
}
