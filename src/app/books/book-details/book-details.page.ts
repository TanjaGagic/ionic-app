import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { Book } from '../book.model';
import { BooksService } from '../books.service';
import {BooksModalComponent} from '../books-modal/books-modal.component';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {
  book: Book;
  isLoading: boolean = false;


  constructor(private route: ActivatedRoute, private booksService: BooksService, private navCtrl: NavController,
    private loadingCtrl: LoadingController, private modalCtrl: ModalController) { }

    ngOnInit() {
      this.route.paramMap.subscribe(paramMap => {
        if (!paramMap.has('bookId')) {
          this.navCtrl.navigateBack('/books');
          return;
        }
  
        this.isLoading = true;
  
        this.booksService
          .getBook(paramMap.get('bookId'))
          .subscribe((book) => {
            this.book = book;
            this.isLoading = false;
          });
      });
  
    }


    onDeleteBook() {
      this.loadingCtrl.create({message: 'Deleting...'}).then(loadingEl => {
        loadingEl.present();
        this.booksService.deleteBook(this.book.id).subscribe(() => {
          loadingEl.dismiss();
          this.navCtrl.navigateBack('/books');
        });
      });
    }

    onEditBook() {
      this.modalCtrl
        .create({
          component: BooksModalComponent,
          componentProps: {title: 'Edit book', name: this.book.title, author: this.book.author, rating: this.book.rating, 
          comment: this.book.comment},
        })
        .then((modal) => {
          modal.present();
          return modal.onDidDismiss();
        })
        .then((resultData) => {
          if (resultData.role === 'confirm') {
            this.loadingCtrl
              .create({message: 'Editing...'})
              .then((loadingEl) => {
                loadingEl.present();
                this.booksService
                  .editBook(
                    this.book.id,
                    resultData.data.bookData.title,
                    resultData.data.bookData.author,
                    resultData.data.bookData.rating,
                    resultData.data.bookData.comment,
                    this.book.imageUrl,
                    this.book.userId
                  )
                  .subscribe((books) => {
                    this.book.title = resultData.data.bookData.title;
                    this.book.author = resultData.data.bookData.author;
                    this.book.rating = resultData.data.bookData.rating;
                    this.book.comment = resultData.data.bookData.comment;
                    loadingEl.dismiss();
                  });
              });
          }
        });
    }

}
