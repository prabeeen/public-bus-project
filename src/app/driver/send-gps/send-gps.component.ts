import { Component, OnInit } from '@angular/core';
import { TransferGpsService } from 'src/app/services/transfer-gps.service';
@Component({
  selector: 'app-send-gps',
  templateUrl: './send-gps.component.html',
  styleUrls: ['./send-gps.component.scss']
})
export class SendGPSComponent implements OnInit {
  checkGPSAvailability: boolean = false;

  constructor(private transferGpsService: TransferGpsService) { }

  ngOnInit(): void {
    this.checkGPSAvailability = this.transferGpsService.checkGPS();
    if(this.checkGPSAvailability){
      this.transferGpsService.sendGPS();
    }

  }

}
