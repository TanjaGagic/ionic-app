import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Homepage', url: '/homepage', icon: 'home' },
    { title: 'Books', url: '/books', icon: 'book' },
    { title: 'Search', url: '/search', icon: 'search' }
  ];
  constructor(private authService: AuthService, private router: Router) {
  }

  onLogOut() {
    this.authService.logOut();
    this.router.navigateByUrl('/log-in');
  }

}
