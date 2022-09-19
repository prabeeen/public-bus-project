import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AdminInterface } from 'src/app/interface/admins';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.scss']
})
export class ManageAdminComponent implements OnInit {

  dataSource = new MatTableDataSource<AdminInterface>();
  displayedColumns: string[] = ['Id','Name','Email','Phone', 'Action'];

  admins$ !: Observable<any>;
  adminsSub!: Subscription;
  admin: AdminInterface[] = [];

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.onGet();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onGet(){
    this.admins$ = this.adminService.getAdmin()
    this.adminsSub = this.admins$.subscribe(adminInfo=>{
      this.admin = adminInfo.data
      this.dataSource.data = this.admin;
    },error=>{
      console.log(error)
    })
  }

  onDelete(row:any){
    const id = row._id;
    this.admins$ = this.adminService.deleteAdmin(id);
    this.adminsSub = this.admins$.subscribe(result=>{
      // console.log(result.message)
      console.log(id, this.admin)
      const updatedPassenger = this.admin.filter(admindata=>{
        return admindata._id !== id;
      })
      console.log(updatedPassenger)
      this.admin = updatedPassenger
      console.log(this.admin)
      this.dataSource.data = this.admin;
    })
  }

  // onUpdate(row:any){
  //   this.adminService.setUpdateAdmin(row)
  //   this.router.navigate(['/admin/update-admin/'+String(row._id)])
  // }

  ngOnDestroy(): void {
    this.adminsSub.unsubscribe()
  }

}
