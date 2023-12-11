import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { IndexAdminComponent } from './index-admin/index-admin.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { PayComponent } from '../payement/pay/pay.component';

const routes: Routes = [
  { path: 'facture', redirectTo: 'facture/index', pathMatch: 'full' },
  { path: 'facture/index', component: IndexComponent },
  { path: 'facture/:id/view', component: ViewComponent },
  { path: 'facture/:id/view', component: ViewComponent },
  { path: 'facture/Admin', component: IndexAdminComponent },
  { path: 'facture/Admin/statistics', component: StatisticsComponent },
  { path: 'payement', component: PayComponent  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactureRoutingModule { }
