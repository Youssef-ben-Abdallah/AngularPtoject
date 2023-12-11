import { Component, OnInit } from '@angular/core';
import { FactureService } from '../facture.service';
import { Chart } from 'chart.js/auto';
import { Facture } from '../facture';
import * as moment from 'moment';
import { Utils } from './Utils';
import { Router } from '@angular/router';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  chiffreAffaireHT: number;
  chiffreAffaireTVA: number;
  chiffreAffaireTTC: number;
  totalPaye: number;
  totalNonPaye: number;
  countTotalPaye: number;
  countTotalImpaye: number;
  latestFactures: Facture[];
  chiffreAffaireParMois: number[];
  dtOptions: DataTables.Settings = {};

  constructor(private factureService: FactureService , private router: Router) { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: false,
      searching: false, 
      ordering: false, 
      order: [[2, 'asc']],
    };
    this.factureService.calculateChiffreAffaireHT().subscribe(data => {
      this.chiffreAffaireHT = data;
    });

    this.factureService.calculateTVA().subscribe(data => {
      this.chiffreAffaireTVA = data;
    });

    this.factureService.calculateChiffreAffaireTTC().subscribe(data => {
      this.chiffreAffaireTTC = data;
    });
    this.factureService.calculateTotalPaye().subscribe(data => {
      this.totalPaye = data;
      this.createCharty()
    });
    this.factureService.calculateTotalNonPaye().subscribe(data => {
      this.totalNonPaye = data;
      this.createCharty()
    });
    this.factureService.countTotalPaye().subscribe(data => {
      this.countTotalPaye = data;
      this.createChart()
    });
    this.factureService.countTotalImpaye().subscribe(data => {
      this.countTotalImpaye = data;
      this.createChart()
    });
    this.factureService.getLatestFourFactures().subscribe(data => {
      this.latestFactures = data
    });
    this.factureService.getChiffreAffaireParMois().subscribe(data => {
      this.chiffreAffaireParMois = data;
      this.createChartyy()
    });

  }
  redirectToFactureAdmin(): void {
    // Navigate to the 'facture/Admin' route
    this.router.navigate(['/facture/Admin']);
  }
  createChart(): void {
    if (this.countTotalPaye !== undefined && this.countTotalImpaye !== undefined) {
      const data = {
        labels: ['Paye', 'Impaye'],
        datasets: [{
          data: [this.countTotalPaye, this.countTotalImpaye],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)'
          ],
          hoverOffset: 4
        }]
      };

      const myChart = new Chart('myChart', {
        type: 'doughnut',
        data: data
      });
    }
  }

  createCharty(): void {
    if (this.totalPaye !== undefined && this.totalNonPaye !== undefined) {
      const data = {
        labels: ['Paye', 'Non Paye'],
        datasets: [{
          data: [this.totalPaye, this.totalNonPaye],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)'
          ],
          hoverOffset: 4
        }]
      };

      const myChart = new Chart('myChart2', {
        type: 'doughnut',
        data: data
      });
    }
  }

  createChartyy(): void {
    if (this.totalPaye !== undefined && this.totalNonPaye !== undefined) {
      const labels = Utils.months({ count: 12 });
      const data = {
        labels: labels,
        datasets: [{
          label: 'Chiffre de affaire',
          data: [ 
            this.chiffreAffaireParMois[11], 
            this.chiffreAffaireParMois[10], 
            this.chiffreAffaireParMois[9], 
            this.chiffreAffaireParMois[8], 
            this.chiffreAffaireParMois[7], 
            this.chiffreAffaireParMois[6],
            this.chiffreAffaireParMois[5],
            this.chiffreAffaireParMois[4],
            this.chiffreAffaireParMois[3],
            this.chiffreAffaireParMois[2],
            this.chiffreAffaireParMois[1],
            this.chiffreAffaireParMois[0]],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgb(201, 203, 207)',
            'rgb(201, 203, 207)',
            'rgb(201, 203, 207)',
            'rgb(201, 203, 207)',
            'rgb(201, 203, 207)',
            'rgb(201, 203, 207)',
            'rgb(201, 203, 207)',
            'rgb(201, 203, 207)',
            'rgb(201, 203, 207)',
            'rgb(201, 203, 207)',
            'rgb(201, 203, 207)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 1
        }]
      };

      const myChart = new Chart('myChart3', {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
        });
    }
  }
}