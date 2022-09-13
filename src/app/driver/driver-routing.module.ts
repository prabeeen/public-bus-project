import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverGuard } from '../guards/driver.guard';
import { DriverComponent } from './driver.component';
import { SendGPSComponent } from './send-gps/send-gps.component';

const routes: Routes = [
  { path: '', component: DriverComponent,canActivate: [DriverGuard], children:[
    // {path: '', redirectTo: 'sendgps'},
    {path: 'sendgps', component: SendGPSComponent, canActivate: [DriverGuard]}
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }
