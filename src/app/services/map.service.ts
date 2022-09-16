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
  busObject!: busCoord[];
  busName: string = '';
  trackBusType: string | null = null;
  privateDriverId: string | null = null;

  //socket data
  driverObj:any = {};
  markerObj:any = {};
  markerTosocket: any = {};

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

      // const marker = this.createMarkerOnly()
      // console.log(marker)


      // const marker = this.createMarker([this.long, this.lat])
      }

  //  private createMarker(longlat:[number,number]){
  //   const marker = new mapboxgl.Marker().setLngLat(longlat).addTo(this.map)
  //   return marker
  //  }

  setBusTrackType(busType: string){
    localStorage.setItem("busType", busType)
  }

  getBusTrackType(){
    this.trackBusType = localStorage.getItem("busType")
  }
  sendBusName(busName:string)
  {
    this.busName = busName;
  }

  removeBusType(){
    localStorage.removeItem("busType");
    this.trackBusType = null;
  }

  leavePrivateRoom(){
    console.log(`leave private connection with ${this.privateDriverId}`)
    this.socketService.emit('leave-private', this.privateDriverId)
    this.privateDriverId = null;
  }

   private createMarkerOnly(id:string){
    // console.log(`createMarkerOnly Id:${id}`)
    const marker = new mapboxgl.Marker();
    const markerHtml = marker.getElement();
    markerHtml.addEventListener('mouseenter', () => {
      markerHtml.style.cursor = 'pointer';
      })
    markerHtml.addEventListener('mouseleave', () => {
      markerHtml.style.cursor = '';
      })

      markerHtml.addEventListener('click',()=>{
        const popup = this.createPopupOnly(id);
        popup.setHTML(`<p>Id: ${id}</p>`);
        marker.setPopup(popup);
      })


      let dblclickCounter = 0;
      markerHtml.addEventListener('dblclick',(e:MouseEvent)=>{
        e.stopPropagation();
        if(dblclickCounter > 0){
          console.log('dblClick only')
        }
        else{

          const requiredDriverId = this.markerTosocket[id]
          // console.log(this.markerTosocket,id,this.busName,requiredDriverId)
          this.privateDriverId = requiredDriverId
          this.socketService.emit('private-connection', [this.busName,requiredDriverId])
          const driverUids = Object.keys(this.driverObj)
          driverUids.map(driverUid=>{
            if(driverUid!==requiredDriverId)
            {
              delete this.driverObj[driverUid]
              const driverId = this.markerObj[driverUid][1]
              console.log(`driverId to be deleted: ${driverId}`)
              this.markerObj[driverUid][0].remove()
              delete this.markerObj[driverUid]
              delete this.markerTosocket[driverId]

            }
          })
          // console.log(this.driverObj, this.markerObj, this.markerTosocket, requiredDriverId)
        }
        dblclickCounter++;
      })

    return marker
   }

   private createPopupOnly(id:string){
    const popup = new mapboxgl.Popup()
    return popup
   }

   drawRoute(){
    const sourceName = this.busName+'route';
    this.busObject = this.geoCoordinate.filter((busCoord)=>{
      return busCoord.bus == this.busName;
    })

    this.map.on('load', () => {
      this.createLineSource(sourceName, this.busObject[0].coord);
      this.addLineSource(sourceName);
      this.createBounds(this.busObject[0].coord);
    });

   }

   busToCoordinate(){
    this.createBounds(this.busObject[0].coord);
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
      const busId: string = driverVal.id;
      this.updateDataObj(driverUid, driverName, busId);
    })
   }

   private updateDataObj(uid: string, name: string, id: string){
    // console.log(`updating all data in map: ${uid}, ${name}, ${id}`)
    this.driverObj[uid] = name;
    const marker = this.createMarkerOnly(id);
    this.markerObj[uid] = [marker, id];
    this.markerTosocket[id] = uid;
    // console.log(this.markerObj)
    // console.log(`markerObj : ${this.markerObj}, markerTosocket: ${this.markerTosocket}`)
   }

   checkDriverDisconnect(){
    this.socketService.listen("driver-disconnect").subscribe((driverUid:any)=>{
      const id:number = this.markerObj[driverUid][1]
      console.log(`driver disconnect: ${driverUid}`)
      if(this.driverObj[driverUid])
      delete this.driverObj[driverUid]
      if(this.markerObj[driverUid]){
        this.markerObj[driverUid][0].remove()
        delete this.markerObj[driverUid]
      }
      if(this.markerTosocket[id])
      {
        delete this.markerTosocket[id]
      }
      // console.log(this.markerObj, this.markerTosocket)
    })
   }

   getExistingDriver(){
    this.socketService.emit('get-driver', '');
    this.socketService.listen('get-driver').subscribe((data:any)=>{
    const entries = Object.entries(data);
    // console.log(entries)
      entries.map((val:any)=>{
        const driverUid: string = val[0];
        const driverName: string = val[1][0];
        const busId: string = val[1][1];
        this.updateDataObj(driverUid, driverName, busId);
      })
    })
   }

   joinBusRoom(){
    console.log(`calling to join room: ${this.busName}`)
    this.socketService.emit('join-room', this.busName);
   }

   checkMarkerRemove(){
    this.socketService.listen('remove-marker').subscribe((driverUid: any)=>{
      console.log("checkMarkerRemove reached.")
      console.log(`marker to remove ${this.markerObj[driverUid]}`)
      this.markerObj[driverUid][0].remove();
    })
   }

   getGPSData(){
    this.socketService.listen('receiveGPS').subscribe((data: any)=>{
      const uid = data.uid
      const coordData = data.coordData
      this.markerObj[uid][0].setLngLat(coordData).addTo(this.map);
          // console.log(data)
        })
   }

  }
