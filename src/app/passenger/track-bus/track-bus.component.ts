import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-track-bus',
  templateUrl: './track-bus.component.html',
  styleUrls: ['./track-bus.component.scss']
})
export class TrackBusComponent implements OnInit {

  busName: string | null = '';
  constructor(private mapService: MapService
    ) { }

  ngOnInit(): void {
    this.mapService.buildMap();
    // console.log(this.mapService.trackBusType)
    // this.busName = this.activatedRoute.snapshot.paramMap.get('busName');
    this.busName = this.mapService.trackBusType;
    if(this.busName)
    {
      this.mapService.sendBusName(this.busName);
      this.mapService.drawRoute();
      this.mapService.getExistingDriver();
      this.mapService.getNewDriver();
      console.log(this.mapService.privateDriverId)
      if(this.mapService.privateDriverId !== null){
        this.mapService.leavePrivateRoom()
      }
      this.mapService.joinBusRoom();
      this.mapService.checkMarkerRemove();
      this.mapService.getGPSData();
      this.mapService.checkDriverDisconnect();
    }
    else{
      alert("You have not tracked any bus!")
    }
  }

  boundControl(e:any){
    if(!this.busName) return;
    this.mapService.busToCoordinate();
  }

}
