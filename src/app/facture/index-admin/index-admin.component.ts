import { Component , OnInit } from '@angular/core';
import { FactureService } from '../facture.service';
import { Facture } from '../facture';

@Component({
  selector: 'app-index-admin',
  templateUrl: './index-admin.component.html',
  styleUrls: ['./index-admin.component.css']
})

export class IndexAdminComponent implements OnInit{
  Factures: Facture[];
  dtOptions: DataTables.Settings = {};
  constructor(public FactureService: FactureService ) { }


 

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: false,
      searching: false, 
      ordering: false, 
      order: [[2, 'asc']],
    };
    this.FactureService.getAllFac().subscribe((data: Facture[])=>{

      this.Factures = data;

      console.log(this.Factures);

    })  

  }
  deleteProduct(id:number){

    this.FactureService.delete(id).subscribe(res => {

         this.Factures = this.Factures.filter(item => item.invoiceId !== id);

         console.log('Post deleted successfully!');

    })

  }
}
