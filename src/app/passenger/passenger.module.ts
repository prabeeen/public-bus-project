import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { PassengerRoutingModule } from './passenger-routing.module';

import { PassengerComponent } from './passenger.component';
import { TrackBusComponent } from './track-bus/track-bus.component';
import { SearchBusComponent } from './search-bus/search-bus.component';
import { BusProgressComponent } from './bus-progress/bus-progress.component';
import { PaymentComponent } from './payment/payment.component';

import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';

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
    ReactiveFormsModule,

    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,

  ]
})
export class PassengerModule { }
