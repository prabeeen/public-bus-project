import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverComponent } from './driver.component';
import { SendGPSComponent } from './send-gps/send-gps.component';

const routes: Routes = [
  { path: '', component: DriverComponent, children:[
    {path: 'sendgps', component: SendGPSComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }
