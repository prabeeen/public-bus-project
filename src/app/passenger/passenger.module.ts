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
import { SearchBusComponent } from './search-bus/search-bus.component';
import { BusProgressComponent } from './bus-progress/bus-progress.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    PassengerComponent,
    TrackBusComponent,
    SearchBusComponent,
    BusProgressComponent,
    PaymentComponent,
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
