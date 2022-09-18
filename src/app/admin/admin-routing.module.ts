import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { AdminComponent } from './admin.component';
import { PaymentInfoComponent } from './payment-info/payment-info.component';

const routes: Routes = [
  { path: '',component: AdminComponent,canActivateChild: [AdminGuard],children:[
  // {path: '', component: AdminComponent},
  {path: ''},
  {path:'add-driver', component: AddDriverComponent},
  {path:'add-admin', component: AddAdminComponent},
  {path:'payment-info', component: PaymentInfoComponent}
] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
