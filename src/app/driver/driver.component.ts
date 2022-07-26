import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
  sideNavContent:any = [
    {content:'signin', route: 'signin'},
    {content:'signup', route: 'signup'},
    {content:'admin', route: 'admin'},
    {content:'driver', route: 'driver'}
    ]
  constructor() { }

  ngOnInit(): void {
  }

}
