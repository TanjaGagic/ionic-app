import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, ModalController, NavController } from '@ionic/angular';
import { Book } from './book.model';
import { BooksModalComponent } from './books-modal/books-modal.component';
import { BooksService } from './books.service';
import { Subscription, Observable } from 'rxjs';
import { SearchPage } from '../search/search.page';
import { EditModalComponent } from './edit-modal/edit-modal.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit {

  books: Book[];
  private bookSub: Subscription;
  results: Observable<any>;
  searchTerm = '';
  searchPage: SearchPage;

  constructor(private menuCtrl: MenuController, private booksService: BooksService, private modalCtrl: ModalController, private alertCtrl: AlertController, public navCtrl: NavController) {
    console.log('constructor');
  }

  openMenu() {
    this.menuCtrl.open();
  }

  nextpage() {
    this.navCtrl.navigateRoot('../search');
  }

  showConfirmAlert(event) {
    event.stopPropagation();
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
                  console.log('Deleted clicked');
                }
            }
        ]
    })
    .then((alert) => alert.present());
  }


  openModal() {
    this.modalCtrl.create({
      component: EditModalComponent,
      componentProps: {title: 'Add a book'}
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



  ngOnInit() {
    console.log('ngOnInit');
    this.bookSub = this.booksService.getBooks().subscribe((books) => {
      this.books = books;
   
    });
  }


  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.bookSub = this.booksService.getBooks().subscribe((books) => {
    this.books = books;});}
  /* this.booksService.getBooks().subscribe((books) => {
      this.books = books;
    });*/
 

  ngViewDidEnter() {
    console.log('ionViewDidEnter');
/*
 this.booksService.getBooks().subscribe((books) => {
      this.books = books;

    });*/
  }

  ngViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  ngViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  ngOnDestroy() {
    if (this.bookSub) {
      this.bookSub.unsubscribe();
    }
  }
  }

