import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
@Input() sideNavContent: any;

@Input() showHamMenu: boolean = false;

sideNav:any = MatSidenav

  constructor() { }

  ngOnInit(): void {
  }

  test(e:any){
    console.log("test")
  }

}
