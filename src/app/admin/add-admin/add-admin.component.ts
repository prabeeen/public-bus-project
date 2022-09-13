import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  addAdminForm!: FormGroup;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.addAdminForm = new FormGroup({
      email : new FormControl(null, {validators: Validators.required}),
      password: new FormControl(null, {validators: Validators.required})
    })
  }

  onAddAdmin(){
    if(!this.addAdminForm.valid){
      return
    }

    const admin: any = {
      email: this.addAdminForm.get('email')?.value,
      password: this.addAdminForm.get('password')?.value
    }

    this.adminService.addAdmin(admin)
    this.addAdminForm.reset()
  }

}
