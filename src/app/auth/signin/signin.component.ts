import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
// import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm!: FormGroup;
  // horizontalPosition: MatSnackBarHorizontalPosition = "start";
  // verticalPosition: MatSnackBarVerticalPosition = "bottom";
  dismissTimeSec: number = 2;

  constructor(private authService: AuthService
    //  private snackBar: MatSnackBar,
    //  private router: Router
     ) { }

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
    // if(result){
    //   this.snackBar.open(result.message, 'close',{
    //     horizontalPosition: this.horizontalPosition,
    //     verticalPosition: this.verticalPosition,
    //   });
    //   setTimeout(()=>{
    //     this.snackBar.dismiss()
    //   }, this.dismissTimeSec * 1000)
    //   this.router.navigate(['/passenger']);
    //   return
    // }
    // this.snackBar.open(result.message, 'close',{
    //   horizontalPosition: this.horizontalPosition,
    //   verticalPosition: this.verticalPosition,

    // })
    // setTimeout(()=>{
    //   this.snackBar.dismiss()
    // }, this.dismissTimeSec * 1000)
  }

}
