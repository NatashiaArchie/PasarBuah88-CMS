import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { logging } from 'protractor';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { VoucherComponent } from './voucher/voucher.component';
import { ReportComponent } from './report/report.component';
import { ManageStaffComponent } from './manage-staff/manage-staff.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'navigation', component: NavigationComponent},
  {path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]},
  {path: 'product', component: ProductComponent,canActivate: [AuthGuard]},
  {path: 'order', component: OrderComponent,canActivate: [AuthGuard]},
  {path: 'voucher', component: VoucherComponent,canActivate: [AuthGuard]},
  {path: 'report', component: ReportComponent,canActivate: [AuthGuard]},
  {path: 'manageStaff', component: ManageStaffComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
