import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseurl = "http://localhost:8088/api/users";

  constructor(
    public http: HttpClient,
    public router: Router,
    public cookieService: CookieService
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getUserById(id: any): Observable<User> {
    return this.http.get<User>(`${this.baseurl}/getClientById/${id}`);
  }
  
  signIn(user: any) {
    return this.http.post<any>(this.baseurl + "/login", user, this.httpOptions)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          localStorage.setItem('access_token', res.token);
  
          // Store user details in cookies
          this.cookieService.set('access_token', res.token);
          this.cookieService.set('user_id', res.id.toString());
          this.cookieService.set('user_email', res.email); // Adjust based on your response
          this.cookieService.set('user_role', res.role.toString()); // Convert to string if the role is a number
  
          // Navigate to the desired page based on the user's role
          const userRole = +this.cookieService.get('user_role'); // Convert to number
          if (userRole === 1) {
            this.router.navigate(['facture/Admin']);
          } else if (userRole === 0) {
            this.router.navigate(['ecommerce']);
          }
        },
        error: (e: any) => {
          console.log(e);
          if (e.error) {
            alert(e.error); // Display the error message from the server
          } else {
            alert("Error during login. Please try again.");
          }
        }
      });
  }
  
  getUserRole(): number | null {
    const userRoleString = this.cookieService.get('user_role');
    return userRoleString ? +userRoleString : null;
  }
  
  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  getUserId(): number | null {
    const userIdString = this.cookieService.get('user_id');
    return userIdString ? +userIdString : null;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    this.cookieService.delete('user_id');
    localStorage.removeItem('refresh_token');
    console.log(removeToken);
    this.router.navigate(['login']);
  }
}
