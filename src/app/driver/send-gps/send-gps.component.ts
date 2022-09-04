import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { TransferGpsService } from 'src/app/services/transfer-gps.service';
@Component({
  selector: 'app-send-gps',
  templateUrl: './send-gps.component.html',
  styleUrls: ['./send-gps.component.scss']
})
export class SendGPSComponent implements OnInit {
  checkGPSAvailability: boolean = false;
  name: string = '';
  initCoord!: [number,number];
  constructor(private transferGpsService: TransferGpsService) { }

  ngOnInit(): void {
    this.checkGPSAvailability = this.transferGpsService.checkGPS();
    // if(this.checkGPSAvailability){
    //   this.name = this.transferGpsService.getName();
    //   this.initCoord = this.transferGpsService.getInitCoord();
    //   this.transferGpsService.sendNewDriver({name:this.name, initCoord: this.initCoord});
    //   // this.transferGpsService.sendGPS();
    // }

  }

}
