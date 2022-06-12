import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { Book } from '../../books/book.model';
import { BooksModalComponent } from '../../books/books-modal/books-modal.component';
import { BooksService } from '../../books/books.service';
import { SearchService } from '../search.service';


@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.page.html',
  styleUrls: ['./search-details.page.scss'],
})


export class SearchDetailsPage implements OnInit {

  information = null;
  private _books = new BehaviorSubject<Book[]>([]);

  constructor(private activatedRoute: ActivatedRoute, private searchService: SearchService, private modalCtrl: ModalController, private booksService: BooksService, private authService: AuthService, private http: HttpClient) { }

  get books() {
    return this._books.asObservable();
  }


  ngOnInit() {

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.searchService.getDetails(id).subscribe(result => {
      console.log(result);
      this.information = result;
    });
  }

  openModal() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.searchService.getDetails(id).subscribe(result => {
      console.log(result);
      this.information = result;
    });


    this.modalCtrl.create({
      component: BooksModalComponent,
      componentProps: { title: 'Add a book', information: this.information },
    }).then((modal: HTMLIonModalElement) => {
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData) => {
      if (resultData.role === 'confirm') {
        console.log(resultData);
        this.booksService.addBook(resultData.data.bookData.title, resultData.data.bookData.author, resultData.data.bookData.rating, resultData.data.bookData.comment, resultData.data.bookData.imageUrl).subscribe((books) => { });
        this.ngOnInit();
      }
    });
  }

  addBook(title: string, author: string, rating: string, comment: string, imageUrl: string) {
    let generatedId;
    let newBook: Book;
    let fetchedUserId: string;

    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        fetchedUserId = userId;
        return this.authService.token;

      }),
      take(1),
      switchMap((token) => {
        newBook = new Book(null,
          title, author, rating, comment,
          imageUrl, fetchedUserId
        );
        return this.http.post<{ name: string }>(
          `https://reviews-f5f0b-default-rtdb.europe-west1.firebasedatabase.app/books.json?auth=${token}`, newBook);
      }),
      take(1),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.books;
      }),
      take(1),
      tap((books) => {
        newBook.id = generatedId;
        this._books.next(books.concat(newBook));
      })
    );
  }
 
  }

