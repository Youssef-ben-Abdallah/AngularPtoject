import { Component } from '@angular/core';
import { AuthService } from './authentification/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService: AuthService) {}
  title = 'mini-prj-front';
  logout() {
    this.authService.doLogout();
  }
}
