import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
  userIsAuthenticated:boolean = false;
  private authListenerSubs!: Subscription;
  sideNavContent:any = [
    {icon:"room",content:'GPS', route: 'sendgps'}
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
