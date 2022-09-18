import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Payment } from 'src/app/interface/payment';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})

export class PaymentHistoryComponent implements OnInit, OnDestroy {
  // ELEMENT_DATA!: any;
  dataSource = new MatTableDataSource<Payment>();

  paymentInfo$!: Observable<any>;
  paymentInfoSub!: Subscription;

  displayedColumns: string[] = ['txnId', 'amount', 'mobile'];
  // dataSource = this.ELEMENT_DATA;

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.paymentInfo$ = this.paymentService.getUserPayments()
    this.paymentInfoSub = this.paymentInfo$.subscribe(payData=>{
      this.dataSource.data = payData.paymentData
      })
  }


  ngOnDestroy(): void {
    this.paymentInfoSub.unsubscribe()
  }

}
