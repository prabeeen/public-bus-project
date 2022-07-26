import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.scss']
})
export class PassengerComponent implements OnInit {

  sideNavContent:any = [
    {content:'Track Bus', route: 'signin'},
    {content:'signup', route: 'signup'},
    {content:'admin', route: 'admin'},
    {content:'driver', route: 'driver'}
    ]

  constructor() { }

  ngOnInit(): void {
  }

}
