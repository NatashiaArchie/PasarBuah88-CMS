import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatDialogModule
  ],

  exports: [
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatDialogModule
  ]
})
export class MaterialModule { }
