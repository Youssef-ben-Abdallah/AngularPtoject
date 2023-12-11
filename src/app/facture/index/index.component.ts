import { Component, OnInit } from '@angular/core';

import { FactureService } from '../facture.service';
import { Router } from '@angular/router';
import { Facture } from '../facture';
import { AuthService } from '../../authentification/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/authentification/user';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit  {
  
  Factures: Facture[] = [];
  dtOptions: DataTables.Settings = {};
  totalAmount: number = 0;
  user : any;
  userobj : any;
  constructor(public FactureService: FactureService, public authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: false,
      searching: false, 
      ordering: false, 
      order: [[2, 'asc']],
    };
    const userid = this.authService.getUserId();
    if (userid !== null) {
      // Now you can use the userId variable
      this.FactureService.getAll(userid).subscribe((data: Facture[]) => {
        this.Factures = data;
        console.log(this.Factures);
      });
    } else {
      console.error('User ID is null. Handle this case accordingly.');
    }
}
selectedInvoices: number[] = [];

calculateTotal() {
  this.totalAmount = this.selectedInvoices
    .map((invoiceId) => this.Factures.find((facture) => facture.invoiceId === invoiceId))
    .reduce((total, facture) => total + (facture?.amount || 0), 0);
}

toggleSelection(invoiceId: number | undefined) {
  if (invoiceId !== undefined) {
    if (this.selectedInvoices.includes(invoiceId)) {
      this.selectedInvoices = this.selectedInvoices.filter((id) => id !== invoiceId);
    } else {
      this.selectedInvoices.push(invoiceId);
    }

    this.calculateTotal();
  }
}
  deleteProduct(invoiceId:number){

    this.FactureService.delete(invoiceId).subscribe(res => {

         this.Factures = this.Factures.filter(item => item.invoiceId !== invoiceId);

         console.log('Post deleted successfully!');

    })

  }
  
  navigateToPayement() {
    if (this.selectedInvoices.length > 0) {
      // Navigate to the payment page and pass the selected invoice IDs as a parameter
      this.router.navigate(['/payement'], { queryParams: { 
        invoices: this.selectedInvoices.join(',') ,
        totalAmount: this.totalAmount
      } });
    } else {
      console.warn('No invoices selected for payment.');
    }
  }
  
}
