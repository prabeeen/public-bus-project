import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.scss']
})
export class PassengerComponent implements OnInit {

  sideNavContent:any = [
    {icon:'search', content:'Search Bus', route: 'searchbus'},
    {icon:'room', content:'Track Bus', route: 'trackbus'},
    {icon:'pending', content:'Progress', route: 'progress'},
    {icon:'payment', content:'Payment', route: 'payment'},
    ]

  constructor() { }

  ngOnInit(): void {
  }

}
