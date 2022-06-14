import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take, tap} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Book } from '../books/book.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  url = 'https://www.googleapis.com/books/v1/volumes';
  apiKey = 'AIzaSyA97cyT9LhWcathY8mXRAnYmCygOoG_OHU';
  private _books = new BehaviorSubject<Book[]>([]);


  constructor(private http: HttpClient, private authService: AuthService) { }

  get books() {
    return this._books.asObservable();
  }

  searchData(title: string): Observable<any> {
    return this.http.get(`${this.url}?q=intitle:${encodeURI(title)}&apiKey=${this.apiKey}`)
      .pipe(
        map(results => {
          return results['items'];
        })
      );
  }

  getDetails(id: string): Observable<any> {
    return this.http.get(
      `${this.url}/${id}?apiKey=${this.apiKey}`);
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
        console.log(title);
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
