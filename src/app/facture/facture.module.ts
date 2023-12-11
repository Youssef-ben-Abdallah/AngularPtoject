import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactureRoutingModule } from './facture-routing.module';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';

import { IndexAdminComponent } from './index-admin/index-admin.component';
import { DataTablesModule } from "angular-datatables";
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [
    IndexComponent,
    ViewComponent,
    IndexAdminComponent,
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    FactureRoutingModule,
    DataTablesModule
  ]
})
export class FactureModule { }
