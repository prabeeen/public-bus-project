import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverRoutingModule } from './driver-routing.module';
import { DriverComponent } from './driver.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { SharedModule } from '../shared/shared.module';
import { SendGPSComponent } from './send-gps/send-gps.component';


@NgModule({
  declarations: [
    DriverComponent,
    SendGPSComponent
  ],
  imports: [
    CommonModule,
    DriverRoutingModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatCardModule,
    MatDividerModule,
    SharedModule,
  ]
})
export class DriverModule { }
