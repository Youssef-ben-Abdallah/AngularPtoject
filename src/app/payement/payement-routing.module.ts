import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { PayComponent } from './pay/pay.component';

const routes: Routes = [
  { path: 'payement/index', component: IndexComponent },
  { path: 'payement', component: PayComponent  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayementRoutingModule { }
