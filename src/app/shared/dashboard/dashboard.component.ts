import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

sideNavContent: any = [
{content:'signin', route: 'signin'},
{content:'signup', route: 'signup'},
{content:'admin', route: 'admin'},
{content:'driver', route: 'driver'},
{content:'item-5', route: 'item-5'},
]

  constructor() { }

  ngOnInit(): void {
  }

  test(e:any){
    console.log("test")
  }

}
