import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-element',
  templateUrl: './book-element.component.html',
  styleUrls: ['./book-element.component.scss'],
})
export class BookElementComponent implements OnInit {
  @Input() book: Book = { id: 'q3', name: 'Neki', author: 'Covek', rating: '8', comment: 'Neki kom', imageUrl: '' };

  constructor() { }

  ngOnInit() {}

}
