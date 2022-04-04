import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Homepage', url: '/folder/Homepage', icon: 'home' },
    { title: 'Books', url: '/books', icon: 'book' },
    { title: 'Movies', url: '/folder/Movies', icon: 'videocam' },
    { title: 'TV Shows', url: '/folder/TV Shows', icon: 'tv' },
    { title: 'About us', url: '/folder/About Us', icon: 'human' },
  ];
  constructor() {}
}
