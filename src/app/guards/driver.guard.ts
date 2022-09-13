import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DriverGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAuth = this.authService.getIsAuth();
      const appUser = this.authService.getAppUser();
      let isDriver: boolean = false;
      if(appUser === 'driver'){
        isDriver = true;
      }
      console.log(`Inside driver guard :${isAuth}, ${isDriver}`)
      if (!isAuth || !isDriver){
        this.router.navigate(['/signin'])
      }
    return (isAuth && isDriver);
  }

}
