import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/interface/users';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isPasswordMatch: boolean = true;
  selectedFile: any;
  signupForm!: FormGroup;
  imageName: string = '';
  isCorrectExtension: boolean = true;
  constructor(private router: Router, public authService: AuthService) { }

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

  onSignUp(){
    if( this.signupForm.get('password')?.value !== this.signupForm.get('confirmPassword')?.value){
      this.isPasswordMatch = false;
      return
    }
    if(!this.signupForm.valid){
      return
    }
    const user: any = {
      username: this.signupForm.get('username')?.value,
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value,
      phone: this.signupForm.get('phone')?.value,
      address: this.signupForm.get('address')?.value,
      idType: this.signupForm.get('idType')?.value,
      idImage: this.signupForm.get('idImage')?.value,
      idNo: this.signupForm.get('idNo')?.value
    }
    this.authService.signupUser(user);
    this.signupForm.reset();
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
