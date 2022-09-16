import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MapService } from './services/map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'publicBusProject';
  constructor(private authService: AuthService, private mapService: MapService){}
  ngOnInit(){
    this.authService.autoAuthUser();
    this.mapService.getBusTrackType();
  }
}
