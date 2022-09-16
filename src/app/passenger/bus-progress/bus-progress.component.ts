import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-bus-progress',
  templateUrl: './bus-progress.component.html',
  styleUrls: ['./bus-progress.component.scss']
})
export class BusProgressComponent implements OnInit {

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
  }

}
