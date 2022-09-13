import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {
  addDriverForm!: FormGroup;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.addDriverForm = new FormGroup({
      email : new FormControl(null, {validators: Validators.required}),
      password: new FormControl(null, {validators: Validators.required})
    })
  }

  onAddDriver(){
    if(!this.addDriverForm.valid){
      return
    }

    const driver: any = {
      email: this.addDriverForm.get('email')?.value,
      password: this.addDriverForm.get('password')?.value
    }

    this.adminService.addDriver(driver)
    this.addDriverForm.reset()
  }

}
