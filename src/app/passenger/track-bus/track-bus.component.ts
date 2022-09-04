import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-track-bus',
  templateUrl: './track-bus.component.html',
  styleUrls: ['./track-bus.component.scss']
})
export class TrackBusComponent implements OnInit {

  constructor(private mapService: MapService,
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.mapService.buildMap();
    const busName = this.activatedRoute.snapshot.paramMap.get('busName');
    if(busName)
    {
      this.mapService.drawRoute(busName);
      this.mapService.getExistingDriver();
      this.mapService.getNewDriver();
      this.mapService.checkDriverDisconnect();
    }
  }

}
