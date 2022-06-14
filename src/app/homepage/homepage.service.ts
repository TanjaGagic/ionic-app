import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../books/book.model';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';


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

export class HomepageService {

  url = 'https://books.google.com/ebooks';
  apiKey = 'AIzaSyA97cyT9LhWcathY8mXRAnYmCygOoG_OHU';

  private _books = new BehaviorSubject<Book[]>([]);

  

 constructor(private http: HttpClient, private authService: AuthService) { }

  get books() {
    return this._books.asObservable();
  }

  getBooks() {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
          .get<{ [key: string]: BookData }>(
            `https://reviews-f5f0b-default-rtdb.europe-west1.firebasedatabase.app/books.json?auth=${token}`
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
    );}
 


}
