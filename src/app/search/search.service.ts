import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  url = 'https://www.googleapis.com/books/v1/volumes';
  apiKey = 'AIzaSyA97cyT9LhWcathY8mXRAnYmCygOoG_OHU';

  constructor(private http: HttpClient, private authService: AuthService) { }

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

 
}
