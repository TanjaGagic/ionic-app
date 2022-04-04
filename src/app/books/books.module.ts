import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BooksPageRoutingModule } from './books-routing.module';

import { BooksPage } from './books.page';
import { BookElementComponent } from './book-element/book-element.component';
import { BooksModalComponent } from './books-modal/books-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BooksPageRoutingModule
  ],
  declarations: [BooksPage, BookElementComponent, BooksModalComponent],
  entryComponents: [BooksModalComponent]
})
export class BooksPageModule {}
