import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router){}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAuth = this.authService.getIsAuth();
      const appUser = this.authService.getAppUser();
      let isAdmin: boolean = false;
      if(appUser === 'admin'){
        isAdmin = true;
      }
      if (!isAuth || !isAdmin){
        this.router.navigate(['/signin'])
      }
    return (isAuth && isAdmin);
  }

}
