import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  khaltiUrl: string = 'https://a.khalti.com/api/v2/epayment/initiate/';
  localUrl: string = 'http://localhost:3001/api/payment';
  headers = new HttpHeaders({
    'content-type': 'application/json'
  })
  constructor(private http: HttpClient) { }

  performPayment(apiData: any){

    this.http.post(this.localUrl+'/initiate_payment', JSON.stringify(apiData), {headers: this.headers}).subscribe((data: any)=>{
      window.open(data.payment_url, '_blank')
    },err=>{
      console.log(err)
    })
  }

  verifyPayment(verifyData: any){
    console.log(verifyData)
    this.http.post(this.localUrl+'/lookup_payment', JSON.stringify(verifyData), {headers: this.headers}).subscribe((data:any)=>{
      console.log(data)
      this.removeCustomerInfo()

    },error=>{
      console.log(error)
    })
  }

  private removeCustomerInfo(){
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
  }

  getUserPayments(){
    return this.http.get(this.localUrl+'/get-payment')
  }

  getAdminPaymentsInfo(){
    return this.http.get(this.localUrl+'/payment-info-admin')
  }

  verifyPaymentDriver(txnId: string){
    const data = {
      txnId: txnId
    }
    return this.http.post('http://localhost:3001/api/payment/payment-verify-driver', JSON.stringify(data), {headers: this.headers})
  }

}
