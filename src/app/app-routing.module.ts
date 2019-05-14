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
import { CategoryComponent } from './category/category.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { AnnouncementComponent } from './announcement/announcement.component';
const routes: Routes = [

  {path:'',
  component: HomeLayoutComponent,
  children: [
    {path: 'navigation', component: NavigationComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'product', component: ProductComponent},
    {path: 'category', component: CategoryComponent},
    {path: 'order', component: OrderComponent},
    {path: 'voucher', component: VoucherComponent},
    {path: 'report', component: ReportComponent},
    {path: 'manageStaff', component: ManageStaffComponent},
    {path: 'announcement', component: AnnouncementComponent}
  ]},
  {path: '',
  component: LoginLayoutComponent,
  children: [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
  ]}


  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
