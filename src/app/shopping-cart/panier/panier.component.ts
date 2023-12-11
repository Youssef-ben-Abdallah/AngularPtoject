import { Component, Input, OnInit } from '@angular/core';
import { FactureService } from '../../facture/facture.service'
import { Router } from '@angular/router';
import { AuthService } from '../../authentification/auth.service';
import { Products } from 'src/app/products/products';
import { Facture } from 'src/app/facture/facture';
import { User } from 'src/app/authentification/user';
import { AnimationFrameScheduler } from 'rxjs/internal/scheduler/AnimationFrameScheduler';
@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  @Input() productAdded: any;
  tva: number = 0;
  totalAmount: number = 0;
  total = 0;
  user: User;

  userobj:any

  constructor(private factureService: FactureService, private router: Router, public authService: AuthService) { }
  
  ngOnInit(): void {
    const userid = this.authService.getUserId();
    this.authService.getUserById(userid).subscribe(
      (userData: User) => {
        this.user = userData;
        this.userobj = {
          "id": userid,
          "nom": this.user.nom,
          "prenom": this.user.prenom,
          "adresse": this.user.adresse,
          "password": this.user.password,
          "email": this.user.email,
          "role": this.user.role
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
   
   
  }


  incrementQuantity(order: any) {
    order.quantity++;
    this.total += order.product.price;
    this.calculateValues();
  }

  decrementQuantity(order: any) {
    if (order.quantity > 0) {
      order.quantity--;
      this.total -= order.product.price;
      this.calculateValues();
    }
  }
  onTotalChange() {
    // This function will be called when the total value changes
    this.calculateValues();
  }

  private calculateValues() {
    this.tva = this.total * 0.19;
    this.totalAmount = this.total + this.tva;
  }



  checkout() {
    const qteTab: any = []
    qteTab.push(this.productAdded.map((p: any) => { return p.quantity }))

    const tabProduct: any = []

    tabProduct.push(this.productAdded.map((p: any) => {
      return {
        "id": p.product.id,
        "name": p.product.name,
        "price": p.product.price,
        "image": p.product.image
      }
    }))
   

    const target = {
      produit: tabProduct[0],
      qte: qteTab[0],
      tva: this.tva,
      totalHT: this.totalAmount,
      amount: this.total,
      dateFacture: new Date(),
      client: this.userobj,
      payer: false
    }
    console.log(target)

    this.factureService.ajoutFacture(target).subscribe((facture: any) => {
      console.log('New Facture added:', facture);

      // Redirect to the list of factures
      this.router.navigate(['/facture/index']);
    });
  }
}
