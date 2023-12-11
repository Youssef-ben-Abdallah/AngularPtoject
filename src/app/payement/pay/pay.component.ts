import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Facture } from 'src/app/facture/facture';
import { Payement } from '../payement';
import { PayementService } from '../payement.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/authentification/auth.service';
import { User } from 'src/app/authentification/user';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  facture: Facture;
  paymentForm: FormGroup;
  selectedInvoiceIds: any;
  totalAmount: any;
  user: any;
  userobj: any;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private paymentService: PayementService,
    private router: Router,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const invoicesParam = params['invoices'];
      const totalAmountParam = params['totalAmount'];
  
      if (invoicesParam) {
        // Split the comma-separated string into an array of numbers
        this.selectedInvoiceIds = invoicesParam.split(',').map(Number);
      }
  
      if (totalAmountParam) {
        // Parse the total amount as a number
        this.totalAmount = Number(totalAmountParam);
      }
  
    });
  
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
        };
  
        // Initialize paymentForm here after userobj is set
        this.paymentForm = this.formBuilder.group({
          amount: this.totalAmount,
          client: this.userobj,
          paymentDate: [null],
          paymentId: [null],
          cardHolderName: [null, Validators.required],
          creditCardNumber: [null, Validators.required],
          cvv: [null, Validators.required],
          expirationDate: [null, Validators.required],
        });
  
        console.log(this.paymentForm.value);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      console.log(this.paymentForm)
      const payment: Payement = this.paymentForm.value;
      console.log(this.paymentForm.value)
      this.paymentService.createPayment(payment).subscribe(
        createdPayment => {
          console.log('Payment created successfully:', createdPayment);
          this.paymentService.updatePayment(this.selectedInvoiceIds).subscribe(
            updatedPayment => {
              console.log('Payment updated successfully:', updatedPayment);
              this.router.navigate(['/facture/index']);
              // Handle any additional logic or UI updates if needed
            },
            error => {
              console.error('Error updating payment:', error);
              // Handle errors or show appropriate messages to the user
            }
          );
        },
        error => {
          console.error('Error creating payment:', error);
          // Handle errors or show appropriate messages to the user
        }
      );
    }
  }
}
