import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() isMenuVisible: boolean = false;
  @Input() sideNav?:MatSidenav;
  @Input() userIsAuthenticated: boolean = false;
  @Output() onLogOut = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

}
