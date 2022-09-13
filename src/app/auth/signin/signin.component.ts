import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm!: FormGroup;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.signInForm = new FormGroup({
      email: new FormControl(null,{validators: [Validators.required, Validators.email]}),
      password: new FormControl(null,{validators:[Validators.required]})
    })

  }

  onSignIn(){
    if(!this.signInForm.valid){
      return
    }
    this.authService.authenticateUser(
      this.signInForm.controls.email.value,
      this.signInForm.controls.password.value
      )

  }

}
