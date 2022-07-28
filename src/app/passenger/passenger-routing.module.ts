import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PassengerComponent } from './passenger.component';
import { TrackBusComponent } from './track-bus/track-bus.component';

const routes: Routes = [
  { path: '', component: PassengerComponent,children:[
    { path: 'trackbus', component: TrackBusComponent}
  ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassengerRoutingModule { }
