import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  constructor() {
    console.log('constructor');
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  ngViewWillEnter() {
    console.log('ionViewWillEnter');
  }

  ngViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ngViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  ngViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }
}
