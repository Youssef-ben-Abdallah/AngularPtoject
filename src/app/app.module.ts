import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { FormsModule } from '@angular/forms';
import { FactureModule } from './facture/facture.module';
import { AgGridModule } from 'ag-grid-angular';
import { AuthentificationModule } from './authentification/authentification.module'; 
import { AuthService } from './authentification/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PayComponent } from './payement/pay/pay.component';
import { IndexComponent } from './payement/index/index.component';
import { CommonModule } from '@angular/common';
import { PayementModule } from './payement/payement.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShoppingCartModule,
    HttpClientModule,
    FormsModule,
    AuthentificationModule,
    FactureModule,
    AgGridModule,
    ReactiveFormsModule,
    CommonModule,
    PayementModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
