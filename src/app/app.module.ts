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
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from './shared/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './auth/auth.guard';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { ProductService } from './shared/product.service';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryService } from './shared/category.service';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';

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
    AddProductComponent,
    RegisterComponent,
    EditStaffComponent,
    CategoryComponent,
    AddCategoryComponent,
    HomeLayoutComponent,
    LoginLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [EmployeeService, AuthGuard, ProductService, CategoryService],
  bootstrap: [AppComponent],
  entryComponents: [AddStaffComponent, EditStaffComponent, AddProductComponent, AddCategoryComponent]
})
export class AppModule { }
