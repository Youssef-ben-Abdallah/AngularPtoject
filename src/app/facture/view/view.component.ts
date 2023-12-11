import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Facture } from '../facture';
import { FactureService } from '../facture.service';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  facture: Facture; // Change this line to use a single object instead of an array
  factureId: number;

  constructor(public FactureService: FactureService, private route: ActivatedRoute) { }
  @ViewChild('htmlData') htmlData!: ElementRef;

  openPDF() {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA, { scale: 2 }).then((canvas) => {
      // Adjusting the scale factor to improve image quality
      let fileWidth = 210; // A4 width in mm
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      PDF.addImage(FILEURI, 'PNG', 0, 0, fileWidth, fileHeight);
      PDF.save('invoice.pdf');
    });
  }

  ngOnInit(): void {
    // Retrieve the factureId from the route parameters
    this.route.params.subscribe(params => {
      this.factureId = Number(params['id']);

      // Call your service function with the retrieved factureId
      this.FactureService.getFactureById(this.factureId).subscribe((data: Facture) => {
        // Assuming that getFactureById returns a single Facture object
        this.facture = data;
        console.log('Facture:', this.facture);

        // You can use this.facture as needed in your component
      });
    });
  }
}
