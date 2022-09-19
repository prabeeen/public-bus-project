// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { AdminService } from 'src/app/services/admin.service';

// @Component({
//   selector: 'app-update-admin',
//   templateUrl: './update-admin.component.html',
//   styleUrls: ['./update-admin.component.scss']
// })
// export class UpdateAdminComponent implements OnInit {
//   updateAdminForm!: FormGroup;
//   constructor(private adminService: AdminService) {

//   }

//   ngOnInit(): void {
//     this.updateAdminForm = new FormGroup({
//       email : new FormControl(null, {validators: Validators.required}),
//       name: new FormControl(null, {validators: Validators.required}),
//       contact: new FormControl(null, {validators: Validators.required})
//     })
//   }

//   onupdateAdmin(){
//     if(!this.updateAdminForm.valid){
//       return
//     }

//     const admin: any = {
//       email: this.updateAdminForm.get('email')?.value,
//       name: this.updateAdminForm.get('name')?.value,
//       contact: this.updateAdminForm.get('contact')?.value
//     }

//     this.adminService.updateAdmin(admin)
//     this.updateAdminForm.reset()
//   }

// }
