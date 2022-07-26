import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
@Input() sideNavContent: any;

@Input() showHamMenu: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  test(e:any){
    console.log("test")
  }

}
