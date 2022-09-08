import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  paymentForm!: FormGroup;

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {

    this.paymentForm = new FormGroup({
      amount: new FormControl(null, {validators: [Validators.required, Validators.minLength(4)]}),
      busId: new FormControl(null, {validators: [Validators.required]}),
      busName: new FormControl(null, {validators: [Validators.required]}),
      customerName: new FormControl(null, {validators: [Validators.required]}),
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      phone: new FormControl(null, {validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]}),
    })

  }

  makePayment(e: any){
    this.paymentService.performPayment(this.paymentForm)
  }

}
