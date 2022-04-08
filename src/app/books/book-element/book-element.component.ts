import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-element',
  templateUrl: './book-element.component.html',
  styleUrls: ['./book-element.component.scss'],
})
export class BookElementComponent implements OnInit {
  @Input() book: Book = { id: 'q3', title: 'Neki', author: 'Covek', rating: '8', comment: 'Neki kom', imageUrl: '', userId: 'xxx' };

   ngOnInit() {}

  constructor(private alertCtrl: AlertController) {
  }

  

  openAlert(event) {
    event.stopPropagation();
  //  event.preventDefault();


    this.alertCtrl
      .create({
        header: 'Saving the book',
        message: 'Are you sure you want to save this book?',
        buttons: [
          {
            text: 'Save',
            handler: () => {
              console.log('Save it.');
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Do not save it.');
            },
          },
        ],
      })
      .then((alert) => alert.present());
  }


}
