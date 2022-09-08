import { Component, OnInit } from '@angular/core';
import { TransferGpsService } from 'src/app/services/transfer-gps.service';
@Component({
  selector: 'app-send-gps',
  templateUrl: './send-gps.component.html',
  styleUrls: ['./send-gps.component.scss']
})
export class SendGPSComponent implements OnInit {
  checkGPSAvailability: boolean = false;
  checkWakeLockAvailability: boolean = false;
  busType: string | null = '';
  name: string | null= '';
  id: string | null = '';
  // initCoord:any;
  constructor(private transferGpsService: TransferGpsService) { }

  ngOnInit(): void {
    this.checkWakeLockAvailability = this.transferGpsService.checkWakeLock();
    this.checkGPSAvailability = this.transferGpsService.checkGPS();
    if(this.checkGPSAvailability){
      this.name = this.transferGpsService.getName();
      this.busType = this.transferGpsService.getBusType();
      this.id = this.transferGpsService.getId();
      if(this.name && this.busType && this.id)
      this.transferGpsService.sendNewDriver({name:this.name, busType: this.busType, id: this.id});
      else
      alert("Name or BusType or Id is missing!!")
      }

  }

  wakeLockChanged(e: any, wakeLockToggler:any){
    if(e.checked)
    this.transferGpsService.acquireLock(wakeLockToggler)
    else
    this.transferGpsService.releaseLock()
  }

  gpsChanged(e: any, gpsToggler:any){
    console.log(e)
    if(!e.checked)
      this.transferGpsService.noGPS()
    else
    this.transferGpsService.sendGPS(gpsToggler)
  }

}
