import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';


interface BookData {
  title: string;
  author: string;
  rating: string;
  comment: string;
  imageUrl: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})

export class BooksService {

  url = 'https://books.google.com/ebooks';
  apiKey = 'AIzaSyA97cyT9LhWcathY8mXRAnYmCygOoG_OHU';

  private _books = new BehaviorSubject<Book[]>([]);

  

 constructor(private http: HttpClient, private authService: AuthService) { }

  get books() {
    return this._books.asObservable();
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
  

  getBooks() {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
          .get<{ [key: string]: BookData }>(
            `https://reviews-f5f0b-default-rtdb.europe-west1.firebasedatabase.app/books.json?auth=${token}&&orderBy=%22userId%22&equalTo=%22` + this.authService.user+`%22`
          );
      }),
      map((bookData: any) => {
        const books: Book[] = [];
        for (const key in bookData) {
          if (bookData.hasOwnProperty(key)) {
            books.push(new Book(key, bookData[key].title, bookData[key].author, bookData[key].rating, bookData[key].comment, bookData[key].imageUrl, bookData[key].userId)
            );
          }
        }
        return books;
      }),
      tap(books => {
        this._books.next(books);
      })
    );

  }

  getBook(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<BookData>(
          `https://reviews-f5f0b-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json?auth=${token}`
        );
      }),
      map((resData: BookData) => {
        return new Book(
          id,
          resData.title,
          resData.author,
          resData.rating,
          resData.comment,
          resData.imageUrl,
          resData.userId
        );
      })
    );
  }

  editBook(id: string, title: string, author: string, rating: string, comment: string, imageUrl: string, userId: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.put(
          `https://reviews-f5f0b-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json?auth=${token}`,
          {
            title, author, rating, comment, imageUrl, userId
          }
        );
      }),
      switchMap(() => {
        return this.books;
      }),
      take(1),
      tap((books) => {
        const updatedBooksIndex = books.findIndex((b) => b.id === id);
        const updatedBooks = [...books];
        updatedBooks[updatedBooksIndex] = new Book(
          id, title, author, rating, comment,  imageUrl, userId
        );
        this._books.next(updatedBooks);
      })
    );
  }


  deleteBook(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.delete(
          `https://reviews-f5f0b-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json?auth=${token}`
        );
      }),
      switchMap(() => {
        return this.books;
      }),
      take(1),
      tap((books) => {
        this._books.next(books.filter((b) => b.id !== id));
      })
    );
  }

  


}
