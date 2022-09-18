import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { BusProgressComponent } from './bus-progress/bus-progress.component';
import { PassengerComponent } from './passenger.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { PaymentVerifiedComponent } from './payment-verified/payment-verified.component';
import { PaymentComponent } from './payment/payment.component';
import { SearchBusComponent } from './search-bus/search-bus.component';
import { TrackBusComponent } from './track-bus/track-bus.component';

const routes: Routes = [
  { path: '',
   component: PassengerComponent ,
   children:[
    // { path:'', redirectTo:'searchbus', pathMatch: "full"},
    { path: '',
    canActivateChild: [AuthGuard],
      children:[
      { path: 'trackbus', component: TrackBusComponent},
      // { path: 'trackbus/:busName', component: TrackBusComponent},
      { path: 'progress', component: BusProgressComponent},
      { path: 'payment', component: PaymentComponent},
      {path: 'payment-verified', component: PaymentVerifiedComponent},
      {path: 'payment-history', component: PaymentHistoryComponent}
    ]} ,

    { path: 'searchbus', component: SearchBusComponent},

  ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassengerRoutingModule { }
