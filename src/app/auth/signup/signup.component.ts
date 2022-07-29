import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  selectedFile: any;
  signupForm!: FormGroup;
  imageName: string = '';
  isCorrectExtension: boolean = true;
  constructor() { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      password: new FormControl(null, {validators: [Validators.required]}),
      confirmPassword: new FormControl(null, {validators: [Validators.required]}),
      phone: new FormControl(null, {validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]}),
      address: new FormControl(null, {validators: [Validators.required]}),
      idType: new FormControl(null),
      idImage: new FormControl(null),
      idNo: new FormControl(null)
    })
  }

  onFileChange(e: Event){
    if ((e.target as HTMLInputElement).files && (e.target as HTMLInputElement).files![0])
    {
      this.selectedFile = (e.target as HTMLInputElement).files![0];
    }
    if (this.selectedFile.type != 'image/jpeg' && this.selectedFile.type !=  'image/jpg' && this.selectedFile.type !=  'image/png'){
      this.isCorrectExtension = false;
      return
    }
    this.isCorrectExtension = true;
    this.signupForm.patchValue({idImage: this.selectedFile});
    this.signupForm.get('idImage')?.updateValueAndValidity();
    this.imageName = this.selectedFile.name;
    console.log(this.signupForm)
  }

}
