import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-books-modal',
  templateUrl: './books-modal.component.html',
  styleUrls: ['./books-modal.component.scss'],
})
export class BooksModalComponent implements OnInit {


  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }
  @ViewChild('f', { static: true }) form: NgForm;
  @Input() title: string;
  @Input() author: string;
  @Input() rating: string;
  @Input() comment: string;
  @Input() imageUrl: string;

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onAddBook() {
    console.log(this.form);
    if (!this.form.valid) {
      return;
    }

    this.modalCtrl.dismiss({
      bookData:
      {
        name: this.form.value.name,
        author: this.form.value.author,
        rating: this.form.value.rating,
        comment: this.form.value.comment,
        imageUrl: this.form.value.imageUrl,
      }
    }, 'confirm');
      }     
  }


