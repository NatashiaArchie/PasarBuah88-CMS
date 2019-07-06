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
import { ProductService } from './shared/product.service';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryService } from './shared/category.service';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AnnouncementDetailComponent } from './announcement-detail/announcement-detail.component';
import { AnnouncementService } from './shared/announcement.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AnalyticComponent } from './analytic/analytic.component';
import { AnnouncementFilterPipe } from './announcement/announcement-filter.pipe';
import { ProductFilterPipe } from './product/product-filter.pipe';
import { CategoryFilterPipe } from './category/category-filter.pipe';
// import * as firebase from 'firebase';

// firebase.initializeApp(environment.firebase);

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
    CategoryComponent,
    AddCategoryComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    AddAnnouncementComponent,
    OrderDetailComponent,
    ProductDetailComponent,
    AnnouncementComponent,
    AnnouncementDetailComponent,
    AnalyticComponent,
    AnnouncementFilterPipe,
    ProductFilterPipe,
    CategoryFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [EmployeeService, AuthGuard, ProductService, CategoryService, AnnouncementService],
  bootstrap: [AppComponent],
  entryComponents: [AddStaffComponent, AddProductComponent, AddCategoryComponent, AddAnnouncementComponent ,AnnouncementDetailComponent, OrderDetailComponent, ProductDetailComponent]
})
export class AppModule { }
