import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TransferGpsService } from 'src/app/services/transfer-gps.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PhoneComponent } from 'src/app/phone/phone.component';
@Component({
  selector: 'app-send-gps',
  templateUrl: './send-gps.component.html',
  styleUrls: ['./send-gps.component.scss']
})
export class SendGPSComponent implements OnInit, OnDestroy {
  checkGPSAvailability: boolean = false;
  checkWakeLockAvailability: boolean = false;
  busType: string | null = '';
  name: string | null= '';
  id: string | null = '';
  userIsAuthenticated: boolean = false;
  userId : string | null = null;
  private authListenerSubs!: Subscription;
  // initCoord:any;
  constructor(private transferGpsService: TransferGpsService, private authService: AuthService, private matBottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    this.checkWakeLockAvailability = this.transferGpsService.checkWakeLock();
    this.checkGPSAvailability = this.transferGpsService.checkGPS();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.userId = this.authService.getAppUserId();
    this.authListenerSubs = this.authService.getAuthListener().subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getAppUserId();
    },error=>{console.log(error)});
    if(this.checkGPSAvailability){
      this.name = this.transferGpsService.getName();
      this.busType = this.transferGpsService.getBusType();
      this.id = this.userId;
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

  onBottomSheetClicked(){
    this.matBottomSheet.open(PhoneComponent)
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }
}
