import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusProgressComponent } from './bus-progress/bus-progress.component';
import { PassengerComponent } from './passenger.component';
import { PaymentComponent } from './payment/payment.component';
import { SearchBusComponent } from './search-bus/search-bus.component';
import { TrackBusComponent } from './track-bus/track-bus.component';

const routes: Routes = [
  { path: '', component: PassengerComponent ,children:[
    { path:'', redirectTo:'searchbus', pathMatch: "full"},
    { path: 'trackbus', component: TrackBusComponent},
    { path: 'trackbus/:busName', component: TrackBusComponent},
    { path: 'searchbus', component: SearchBusComponent},
    { path: 'progress', component: BusProgressComponent},
    { path: 'payment', component: PaymentComponent},

  ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassengerRoutingModule { }
