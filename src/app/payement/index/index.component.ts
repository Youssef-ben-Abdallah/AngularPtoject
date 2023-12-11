import { Component, OnInit } from '@angular/core';
import { Payement } from '../payement';
import { PayementService } from '../payement.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit  {

  dtOptions: DataTables.Settings = {};
  constructor(public payementService: PayementService) { }

  payement: Payement[] = [];

  ngOnInit(): void {
    
    this.payementService.getAllPayments().subscribe((data: Payement[])=>{

      this.payement = data;

      console.log(this.payement);

    })  

  }

}
