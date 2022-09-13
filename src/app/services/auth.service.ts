import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: any;
  baseUrl: string = 'http://localhost:3001'
  imagePath: string = ''
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated: boolean = false;
  private tokenTimer: any;


  constructor(private http: HttpClient, private router: Router) { }

  getToken(){
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getAuthListener(){
    return this.authStatusListener.asObservable();
  }

  authenticateUser(email:string, password: string){
    this.http.post(this.baseUrl+'/api/users/login',{email: email, password: password}).subscribe((response:any)=>{
      const token = response.token;
      this.token = token;
      if(token){
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration)
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, expirationDate)
        console.log(expirationDate)
        this.router.navigate(['/passenger']);
      }
    })

  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
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
    console.log(token, expirationDate)
    if(!token || !expirationDate){
      return
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

  private saveAuthData(token: string, expirationDate: Date){
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString())
  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }
}
