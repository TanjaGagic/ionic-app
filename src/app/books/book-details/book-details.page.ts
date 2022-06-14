import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Book } from '../book.model';
import { BooksService } from '../books.service';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {
  book: Book;
  isLoading: boolean = false;
  information = null;


  constructor(private route: ActivatedRoute, private booksService: BooksService, private navCtrl: NavController,
    private loadingCtrl: LoadingController, private modalCtrl: ModalController, private alertCtrl: AlertController) { }

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

    this.alertCtrl.create({
      header: 'Deleting book',
      message: 'Are you sure you want to permanently delete this book?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.loadingCtrl.create({ message: 'Deleting...' }).then(loadingEl => {
              loadingEl.present();
              this.booksService.deleteBook(this.book.id).subscribe(() => {
                loadingEl.dismiss();
                this.navCtrl.navigateBack('/books');
              });
            });
          }
        }
      ]
    }).then((alert) => alert.present()
    );
  }


  onEditBook() {
  
    this.modalCtrl
      .create({
        component: EditModalComponent,
        componentProps: {
          title: 'Edit book', name: this.book.title, author: this.book.author, rating: this.book.rating,
          comment: this.book.comment, imageUrl: this.book.imageUrl, information: this.book
        },
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((resultData) => {
        if (resultData.role === 'confirm') {
          this.loadingCtrl
            .create({ message: 'Editing...' })
            .then((loadingEl) => {
              loadingEl.present();
              this.booksService
                .editBook(
                  this.book.id,
                  this.book.title,
                  this.book.author,
                  resultData.data.bookData.rating,
                  resultData.data.bookData.comment,
                  this.book.imageUrl,
                  this.book.userId
                )
                .subscribe((books) => {
                  this.book.title = this.book.title;
                  this.book.author = this.book.author;
                  this.book.rating = resultData.data.bookData.rating;
                  this.book.comment = resultData.data.bookData.comment;
                  this.book.imageUrl = this.book.imageUrl;
                  loadingEl.dismiss();
                });
            });
        }
        });
    }



}
