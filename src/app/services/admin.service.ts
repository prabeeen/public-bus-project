import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl: string = environment.baseUrl;
  // rowToUpdate: any;

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

  getPassenger(){
    return this.http.get(this.baseUrl+'/api/admin/get-passenger')
  }

  deletePassenger(id:any){
    console.log(id)
    return this.http.delete(this.baseUrl+'/api/admin/delete-passenger/'+id)
  }

  getAdmin(){
    return this.http.get(this.baseUrl+'/api/admin/get-admin')
  }

  deleteAdmin(id:any){
    return this.http.delete(this.baseUrl+'/api/admin/delete-admin/'+id)
  }

  // setUpdateAdmin(row:any){
  //   this.rowToUpdate = row
  // }
}
