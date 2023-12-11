import { Component, ViewChild } from '@angular/core';
import { CardsComponent } from '../cards/cards.component';
import { PanierComponent } from '../panier/panier.component';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css']
})
export class EcommerceComponent {
  public collapsed = true;
    orderFinished = false;

    @ViewChild('productsC')
    productsC: CardsComponent;

    @ViewChild('shoppingCartC')
    shoppingCartC: PanierComponent;


    toggleCollapsed(): void {
        this.collapsed = !this.collapsed;
    }

    finishOrder(orderFinished: any) {
        this.orderFinished = orderFinished;
    }

    reset() {
        this.orderFinished = false;
    }
    
    productAdded :any[]=[]
    addProductToCart(product:any) {  
      let existe=false;
      this.productAdded.map((p)=>{
        if(p.product.id===product.product.id) {existe=true}
      })
      if(existe===false) this.productAdded.push(product);
 
    }

}
