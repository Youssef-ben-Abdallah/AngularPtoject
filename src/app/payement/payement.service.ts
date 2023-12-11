import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Payement } from './payement';
import { Facture } from '../facture/facture';



@Injectable({
  providedIn: 'root'
})
export class PayementService {

  private apiURL = 'http://localhost:8088/'
  httpOptions = {

    headers: new HttpHeaders({

      'Content-Type': 'application/json'

    })

  }
  constructor(private http: HttpClient) { }

  // Function to get all payments
  getAllPayments(): Observable<Payement[]> {
    return this.http.get<Payement[]>(`${this.apiURL}paiements/all`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllPaymentsbyid(id:any): Observable<Payement[]> {
    return this.http.get<Payement[]>(`${this.apiURL}paiements/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Function to create a payment
  createPayment(payment: Payement): Observable<Payement> {
    return this.http.post<Payement>(`${this.apiURL}paiements/create`, payment, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  

  // Function to update a payment
  updatePayment(facture: Facture): Observable<Payement> {
    return this.http.put<Payement>(`${this.apiURL}api/factures/update`, facture, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Function to delete a payment
  deletePayment(paymentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}paiements/delete/${paymentId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Handle errors
  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }
}
