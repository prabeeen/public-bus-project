import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { UserInterface } from 'src/app/interface/users';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-manage-passengers',
  templateUrl: './manage-passengers.component.html',
  styleUrls: ['./manage-passengers.component.scss']
})
export class ManagePassengersComponent implements OnInit, OnDestroy {

  dataSource = new MatTableDataSource<UserInterface>();
  displayedColumns: string[] = ['Id','Name','Email','Phone','Id Type', 'Id No.', 'Action'];

  passengers$ !: Observable<any>;
  passengersSub!: Subscription;
  passenger: UserInterface[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.onGet();

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onGet(){
    this.passengers$ = this.adminService.getPassenger()
    this.passengersSub = this.passengers$.subscribe(passengerInfo=>{
      this.passenger = passengerInfo.data
      this.dataSource.data = this.passenger;
    },error=>{
      console.log(error)
    })
  }

  onDelete(row:any){
    const id = row._id;
    this.passengers$ = this.adminService.deletePassenger(id);
    this.passengersSub = this.passengers$.subscribe(result=>{
      // console.log(result.message)
      console.log(id, this.passenger)
      const updatedPassenger = this.passenger.filter(passengerdata=>{
        return passengerdata._id !== id;
      })
      console.log(updatedPassenger)
      this.passenger = updatedPassenger
      console.log(this.passenger)
      this.dataSource.data = this.passenger;
    })
  }

  ngOnDestroy(): void {
    this.passengersSub.unsubscribe()
  }
}
