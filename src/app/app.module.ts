import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { VoucherComponent } from './voucher/voucher.component';
import { ManageStaffComponent } from './manage-staff/manage-staff.component';
import { ReportComponent } from './report/report.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { MaterialModule } from './material/material.module';
import { AddProductComponent } from './add-product/add-product.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    DashboardComponent,
    ProductComponent,
    OrderComponent,
    VoucherComponent,
    ManageStaffComponent,
    ReportComponent,
    AddStaffComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddStaffComponent, AddProductComponent]
})
export class AppModule { }
