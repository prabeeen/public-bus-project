import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
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
