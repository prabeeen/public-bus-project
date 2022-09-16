import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { TransferGpsService } from './transfer-gps.service';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: any;
  private baseUrl: string = environment.baseUrl;
  imagePath: string = ''
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated: boolean = false;
  private tokenTimer: any;
  private appUser: string = '';
  private appUserId: string | null = null;

  horizontalPosition: MatSnackBarHorizontalPosition = "start";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  dismissTimeSec: number = 2;


  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar, private transferGpsService: TransferGpsService,private mapService: MapService) { }

  getToken(){
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getAuthListener(){
    return this.authStatusListener.asObservable();
  }

  getAppUser(){
    return this.appUser;
  }

  getAppUserId(){
    return this.appUserId;
  }

  authenticateUser(email:string, password: string){
    if(email.split('_')[0].toLowerCase() === 'driver'){
      this.http.post(this.baseUrl+'/api/admin/driver-login',{email: email.split("_")[1], password: password}).subscribe((response:any)=>{
        const token = response.token;
        this.token = token;
        if(token){
          const expiresInDuration = response.expiresIn;
          this.appUser = 'driver'
          this.appUserId = response.userId;
          this.setAuthTimer(expiresInDuration)
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.appUser, this.appUserId)
          console.log(expirationDate)
          this.router.navigate(['/driver']);
          this.showSnackBar('Authentication Successful!')
        }
      })
    }
    else if(email.split('_')[0].toLowerCase() === 'admin'){
      this.http.post(this.baseUrl+'/api/admin/admin-login',{email: email.split("_")[1], password: password}).subscribe((response:any)=>{
        const token = response.token;
        this.token = token;
        if(token){
          const expiresInDuration = response.expiresIn;
          this.appUser = 'admin'
          this.appUserId = response.userId
          this.setAuthTimer(expiresInDuration)
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.appUser, this.appUserId)
          console.log(expirationDate)
          this.router.navigate(['/admin']);
          this.showSnackBar('Authentication Successful!')
        }
      })

    }
    else{
      this.http.post(this.baseUrl+'/api/users/login',{email: email, password: password}).subscribe((response:any)=>{
        const token = response.token;
        this.token = token;
        if(token){
          const expiresInDuration = response.expiresIn;
          this.appUser = 'passenger'
          this.appUserId = response.userId
          this.setAuthTimer(expiresInDuration)
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.appUser, this.appUserId)
          console.log(expirationDate)
          this.router.navigate(['/passenger']);
          this.showSnackBar('Authentication Successful!')
        }
      },error=>{
        alert(error.message)
      })
    }
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.appUserId = null;
    this.authStatusListener.next(false);
    if(this.appUser === 'driver'){
      this.transferGpsService.noGPS();
    }
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.mapService.removeBusType()
    this.router.navigate(['/']);
  }

  signupUser(userData: any){
    if (userData.idType!==null){
      const userPostData = new FormData();
      userPostData.append('username', userData.username);
      userPostData.append('email', userData.email);
      userPostData.append('password', userData.password);
      userPostData.append('phone', String(userData.phone));
      userPostData.append('address', userData.address);
      userPostData.append('idType', userData.idType);
      userPostData.append('idImage', userData.idImage, userData.username);
      userPostData.append('idNo', String(userData.idNo));

      this.http.post(this.baseUrl+'/api/users/signup', userPostData).subscribe((datareturn:any)=>{
        this.imagePath = datareturn.data.idImagePath
        console.log(this.imagePath)
        this.router.navigate(["/"]);
      },
      (err)=>{
        console.log(err)
      })
      return
    }
    const jsonData = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      address: userData.address,
    }
    this.http.post(this.baseUrl+'/api/users/signup', jsonData).subscribe((datareturn:any)=>{
      console.log(datareturn)
    },error=>{
      console.log(error)
    })
  }

  autoAuthUser(){
    const authInfo = this.getAuthData();
    console.log(authInfo)
    if(!authInfo){
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime()
    console.log(expiresIn)
    if(expiresIn > 0){
      this.token = authInfo.token;
      this.appUser = authInfo.appUser;
      this.appUserId = authInfo.appUserId;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      this.setAuthTimer(expiresIn / 1000);
      console.log("authenticated after refresh")
    }

  }

  private setAuthTimer(duration: number){
    console.log("Setting timer:" + duration)
    this.tokenTimer = setTimeout(()=>{
      this.logout()
    }, duration * 1000)
  }

  private getAuthData(){
    const token = localStorage.getItem("token")
    const expirationDate = localStorage.getItem("expiration")
    const appUserId = localStorage.getItem("appUserId")
    const appUser = localStorage.getItem("appUser")
    if(!token || !expirationDate || !appUser){
      return
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      appUser: appUser,
      appUserId: appUserId

    }
  }

  private saveAuthData(token: string, expirationDate: Date, appUser: string, appUserId: string|null){
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString())
    localStorage.setItem("appUser", appUser)
    if(appUserId)
    localStorage.setItem("appUserId", appUserId)
  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("appUser");
    localStorage.removeItem("appUserId");
  }


  private showSnackBar(message: string){
      this.snackBar.open(message, 'close',{
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
      setTimeout(()=>{
        this.snackBar.dismiss()
      }, this.dismissTimeSec * 1000)
  }
}
