import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Facture } from './facture';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
 

  private apiURL = 'http://localhost:8088/api/factures/'
  httpOptions = {

    headers: new HttpHeaders({

      'Content-Type': 'application/json'

    })

  }

  constructor(private httpClient: HttpClient) { }

  getFactureById(factureid:number): Observable<any> {

  

    return this.httpClient.get(this.apiURL + factureid)

  

    .pipe(

      catchError(this.errorHandler)

    )

  }
  getAll(clientid:number): Observable<any> {

  

    return this.httpClient.get(this.apiURL + 'byClientId/'+ clientid)

  

    .pipe(

      catchError(this.errorHandler)

    )

  }

  getAllFac(): Observable<any> {

  

    return this.httpClient.get(this.apiURL + 'listeFactures')

  

    .pipe(

      catchError(this.errorHandler)

    )

  }

  find(id:object): Observable<any> {

  

    return this.httpClient.get(this.apiURL + id)

  

    .pipe(

      catchError(this.errorHandler)

    )

  }
  delete(id:number){

    return this.httpClient.delete(this.apiURL + id, this.httpOptions)

  

    .pipe(

      catchError(this.errorHandler)

    )

  }

  calculateChiffreAffaireHT(): Observable<number> {
    return this.httpClient.get<number>(this.apiURL + 'calculateHT')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  calculateTVA(): Observable<number> {
    return this.httpClient.get<number>(this.apiURL + 'calculateTVA')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  calculateChiffreAffaireTTC(): Observable<number> {
    return this.httpClient.get<number>(this.apiURL + 'calculateTTC')
      .pipe(
        catchError(this.errorHandler)
      );
  }
  calculateTotalPaye(): Observable<number> {
    return this.httpClient.get<number>(`${this.apiURL}totalPaye`);
  }

  calculateTotalNonPaye(): Observable<number> {
    return this.httpClient.get<number>(`${this.apiURL}totalNonPaye`);
  }

  countTotalPaye(): Observable<number> {
    return this.httpClient.get<number>(`${this.apiURL}countTotalPaye`);
  }

  countTotalImpaye(): Observable<number> {
    return this.httpClient.get<number>(`${this.apiURL}countTotalImpaye`);
  }

  getLatestFourFactures(): Observable<Facture[]> {
    return this.httpClient.get<Facture[]>(`${this.apiURL}latestFour`);
  }

  getChiffreAffaireParMois(): Observable<number[]> {
    return this.httpClient.get<number[]>(`${this.apiURL}chiffreAffaireParMois`);
  }

  ajoutFacture(facture: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiURL}add`, facture)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  
  
  errorHandler(error:any) {

    let errorMessage = '';

    if(error.error instanceof ErrorEvent) {

      errorMessage = error.error.message;

    } else {

      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

    }

    return throwError(errorMessage);

 }


}
