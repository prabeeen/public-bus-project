import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  addDriver(driverInfo: any){
    this.http.post(this.baseUrl+'/api/admin/add-driver', driverInfo).subscribe(driverResponse=>{
      console.log(driverResponse)
    })
  }

  addAdmin(adminInfo: any){
    this.http.post(this.baseUrl+'/api/admin/add-admin', adminInfo).subscribe(adminResponse=>{
      console.log(adminResponse)
    })
  }
}
