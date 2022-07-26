import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassengerRoutingModule } from './passenger-routing.module';
import { PassengerComponent } from './passenger.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    PassengerComponent
  ],
  imports: [
    CommonModule,
    PassengerRoutingModule,
    SharedModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule
  ]
})
export class PassengerModule { }
