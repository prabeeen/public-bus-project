import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private backendUrl: string = environment.apiUrl+'/payment/';
  headers = new HttpHeaders({
    'content-type': 'application/json'
  })
  constructor(private http: HttpClient) { }

  performPayment(apiData: any){

    this.http.post(this.backendUrl+'initiate_payment', JSON.stringify(apiData), {headers: this.headers}).subscribe((data: any)=>{
      window.open(data.payment_url, '_blank')
    },err=>{
      console.log(err)
    })
  }

  verifyPayment(verifyData: any){
    console.log(verifyData)
    this.http.post(this.backendUrl+'lookup_payment', JSON.stringify(verifyData), {headers: this.headers}).subscribe((data:any)=>{
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
    return this.http.get(this.backendUrl+'get-payment')
  }

  getAdminPaymentsInfo(){
    return this.http.get(this.backendUrl+'payment-info-admin')
  }

  verifyPaymentDriver(txnId: string){
    const data = {
      txnId: txnId
    }
    return this.http.post(this.backendUrl+'payment-verify-driver', JSON.stringify(data), {headers: this.headers})
  }

}
