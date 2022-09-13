import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.scss']
})
export class PassengerComponent implements OnInit, OnDestroy {
  userIsAuthenticated:boolean = false;
  private authListenerSubs!: Subscription;
  sideNavContent:any = [
    {icon:'search', content:'Search Bus', route: 'searchbus'},
    {icon:'room', content:'Track Bus', route: 'trackbus'},
    {icon:'pending', content:'Progress', route: 'progress'},
    {icon:'payment', content:'Payment', route: 'payment'},
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

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }
}
