import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayementRoutingModule } from './payement-routing.module';
import { IndexComponent } from './index/index.component';
import {PayComponent } from './pay/pay.component'
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    IndexComponent, // Declare IndexComponent
    PayComponent,
    
  ],
  imports: [
    CommonModule,
    PayementRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule, 
  ]
})
export class PayementModule { }
