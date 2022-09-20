import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // rowToUpdate: any;
  private backendUrl: string = environment.apiUrl+'/admin/'

  constructor(private http: HttpClient) { }

  addDriver(driverInfo: any){
    this.http.post(this.backendUrl+'add-driver', driverInfo).subscribe(driverResponse=>{
      console.log(driverResponse)
    })
  }

  addAdmin(adminInfo: any){
    this.http.post(this.backendUrl+'add-admin', adminInfo).subscribe(adminResponse=>{
      console.log(adminResponse)
    })
  }

  getPassenger(){
    return this.http.get(this.backendUrl+'get-passenger')
  }

  deletePassenger(id:any){
    console.log(id)
    return this.http.delete(this.backendUrl+'delete-passenger/'+id)
  }

  getAdmin(){
    return this.http.get(this.backendUrl+'get-admin')
  }

  deleteAdmin(id:any){
    return this.http.delete(this.backendUrl+'delete-admin/'+id)
  }

  // setUpdateAdmin(row:any){
  //   this.rowToUpdate = row
  // }
}
