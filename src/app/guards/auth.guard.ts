import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router){}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAuth = this.authService.getIsAuth();
      const appUser = this.authService.getAppUser();
      let isPassenger: boolean = false;
      if(appUser === 'passenger'){
        isPassenger = true;
      }
      if (!isAuth || !isPassenger){
        this.router.navigate(['/signin'])
      }
    return (isAuth && isPassenger);
  }

}
