import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassengerRoutingModule } from './passenger-routing.module';
import { PassengerComponent } from './passenger.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TrackBusComponent } from './track-bus/track-bus.component';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    PassengerComponent,
    TrackBusComponent,
  ],
  imports: [
    CommonModule,
    PassengerRoutingModule,
    SharedModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
  ]
})
export class PassengerModule { }
