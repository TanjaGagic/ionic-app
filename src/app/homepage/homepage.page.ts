import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Book } from '../books/book.model';
import { HomepageService } from './homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  books: Book[];
  private bookSub: Subscription;
  results: Observable<any>;
  searchTerm = '';


  constructor(private homepageService: HomepageService) {
    console.log('constructor');
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.bookSub = this.homepageService.getBooks().subscribe((books) => {
      this.books = books;
   
    });
  }



  ngViewWillEnter() {
   
      console.log('ngViewWillEnter');
  
    this.homepageService.getBooks().subscribe((books) => {
        this.books = books;
      });
    
  }

  ngViewDidEnter() {
    console.log('ionViewDidEnter');

 this.homepageService.getBooks().subscribe((books) => {
      this.books = books;

    });
  }

  ngViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  ngViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  ngOnDestroy() {
    if (this.bookSub) {
      this.bookSub.unsubscribe();
    }
  }
  }

