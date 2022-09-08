import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  khaltiUrl: string = 'https://a.khalti.com/api/v2/epayment/initiate/';
  localUrl: string = 'http://localhost:3001/api/payment'
  constructor(private http: HttpClient) { }

  performPayment(payForm:any){
    const headers = new HttpHeaders({
      'content-type': 'application/json'
    })
    console.log(payForm)
    const jsonData = this.makeJson(payForm)
    this.http.post(this.localUrl, jsonData, {headers: headers}).subscribe(data=>{
      console.log(data)
    },err=>{
      console.log(err)
    })
  }

  makeJson(form:any){
    return {
      amount: form.controls.amount.value,
      purchase_order_id: "t100",
      purchase_order_name: "sample_case",
      customer_info: {
      name: "Ram Narayan",
      email: "example@gmail.com",
      phone: "9811496763"
    }
    }
  }
}
