import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.scss']
})
export class PassengerComponent implements OnInit {

  sideNavContent:any = [
    {icon:'room', content:'Track Bus', route: 'trackbus'},
    {icon:'', content:'test', route: 'test'},
    {icon:'', content:'admin', route: 'admin'},
    {icon:'', content:'driver', route: 'driver'}
    ]

  constructor() { }

  ngOnInit(): void {
  }

}
