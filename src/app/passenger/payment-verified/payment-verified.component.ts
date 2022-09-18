import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take} from 'rxjs/operators'
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment-verified',
  templateUrl: './payment-verified.component.html',
  styleUrls: ['./payment-verified.component.scss']
})
export class PaymentVerifiedComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.pipe(take(1)).subscribe((responseData:any)=>{
      console.log(responseData)
      if(!responseData){
        return
      }
    const verifyData = {
      amount: Number(responseData.params.amount),
      mobile: responseData.params.mobile,
      pidx: responseData.params.pidx,
      txnId: responseData.params.txnId,
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      phone: localStorage.getItem("phone"),
      userId: localStorage.getItem("appUserId")

      }
      this.paymentService.verifyPayment(verifyData)

    },err=>{
      console.log(err)
    })
  }

}
