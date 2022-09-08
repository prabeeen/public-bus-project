import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-track-bus',
  templateUrl: './track-bus.component.html',
  styleUrls: ['./track-bus.component.scss']
})
export class TrackBusComponent implements OnInit {

  busName: string | null = '';
  constructor(private mapService: MapService,
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.mapService.buildMap();
    this.busName = this.activatedRoute.snapshot.paramMap.get('busName');
    if(this.busName)
    {
      this.mapService.sendBusName(this.busName);
      this.mapService.drawRoute();
      this.mapService.getExistingDriver();
      this.mapService.getNewDriver();
      this.mapService.joinBusRoom();
      this.mapService.checkMarkerRemove();
      this.mapService.getGPSData();
      this.mapService.checkDriverDisconnect();
    }
  }

  boundControl(e:any){
    if(!this.busName) return;
    this.mapService.busToCoordinate();
  }

}
