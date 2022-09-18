import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  userIsAuthenticated:boolean = false;
  private authListenerSubs!: Subscription;
  sideNavContent:any = [
    {icon:"add",content:'Add Driver', route: 'add-driver'},
    {icon:"add",content:'Add Admin', route: 'add-admin'},
    {icon:"payment",content:'Payment Info', route: 'payment-info'}
    ]
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthListener().subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;
    },error=>{console.log(error)});
  }

  onLogOut(e:any){
    this.authService.logout();
  }

}
