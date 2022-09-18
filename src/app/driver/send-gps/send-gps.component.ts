import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TransferGpsService } from 'src/app/services/transfer-gps.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PhoneComponent } from 'src/app/phone/phone.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment.service';
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
  pidxPaymentForm!: FormGroup;
  value$!: Observable<any>;
  valueSub!: Subscription;
  verificationCheck: boolean = false;
  dupverificationCheck: boolean = true;
  verificationData!: {amount: Number, mobile: string, phone: string, name: string};

  constructor(private transferGpsService: TransferGpsService, private authService: AuthService, private matBottomSheet: MatBottomSheet,
    private paymentService: PaymentService) { }

  ngOnInit(): void {

    this.pidxPaymentForm = new FormGroup({
      txnId: new FormControl(null, {validators: Validators.required})
    })


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

  verifyPayment(){
    this.value$ = this.paymentService.verifyPaymentDriver(this.pidxPaymentForm.value.txnId)
    this.valueSub = this.value$.subscribe(data=>{
      this.verificationCheck = data.verification;
      this.dupverificationCheck = data.verification;
      if(this.verificationCheck){
        this.verificationData = {...data.data[0]};

      }
      console.log(data)
    })
  }

  changeVerificationCheck(){
    this.verificationCheck = !this.verificationCheck;
  }

  changedupverificationCheck(){
    this.dupverificationCheck = !this.dupverificationCheck;
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
    this.valueSub.unsubscribe();
  }
}
