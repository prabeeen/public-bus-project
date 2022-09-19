import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Payment } from 'src/app/interface/payment';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Payment>();

  paymentInfo$!: Observable<any>;
  paymentInfoSub!: Subscription;

  displayedColumns: string[] = ['txnId', 'amount', 'mobile', 'userId'];
  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.paymentInfo$ = this.paymentService.getAdminPaymentsInfo()
    this.paymentInfoSub = this.paymentInfo$.subscribe(payData=>{
      this.dataSource.data = payData.paymentData
      })
  }

  ngOnDestroy(): void {
    this.paymentInfoSub.unsubscribe();
  }

}
