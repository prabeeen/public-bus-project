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
      amount: new FormControl(null, {validators: [Validators.required, Validators.min(10), Validators.max(1000)]}),
      busId: new FormControl(null, {validators: [Validators.required]}),
      busName: new FormControl(null, {validators: [Validators.required]}),
      customerName: new FormControl(null, {validators: [Validators.required]}),
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      phone: new FormControl(null, {validators: [Validators.required, Validators.min(10)]}),
    })

  }

  makePayment(e: any){
    if(!this.paymentForm.valid){
      return
    }

    const data = {
      return_url: "http://localhost:4200/passenger/payment-verified/",
      website_url: "http://localhost:4200",
      amount: String(+this.paymentForm.value.amount * 100),
      purchase_order_id: this.paymentForm.value.busId,
      purchase_order_name: this.paymentForm.value.busName,
      customer_info: {
        name: this.paymentForm.value.customerName,
        email: this.paymentForm.value.email,
        phone: this.paymentForm.value.phone
      }
    }

    this.setCustomerInfo(data.customer_info.name, data.customer_info.email, data.customer_info.phone);


    this.paymentService.performPayment(data)
  }

  private setCustomerInfo(name:string, email: string, phone: string){
    localStorage.setItem("name", name)
    localStorage.setItem("email", email)
    localStorage.setItem("phone", phone)
  }

}
