import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Book } from '../../books/book.model';

@Component({
  selector: 'app-book-hp-element',
  templateUrl: './book-hp-element.component.html',
  
})
export class BookHpElementComponent implements OnInit {
  @Input() book: Book = { id: 'q3', title: 'Neki', author: 'Covek', rating: '8', comment: 'Neki kom', imageUrl: '', userId: 'xxx' };

   ngOnInit() {}

  constructor(private alertCtrl: AlertController) {
  }
}
