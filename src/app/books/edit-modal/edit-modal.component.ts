import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {

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

  onEditBook() {
    console.log(this.form);
    if (!this.form.valid) {
      return;
    }

    this.modalCtrl.dismiss({
      bookData:
      {
        title: this.form.value.name,
        author: this.form.value.author,
        rating: this.form.value.rating,
        comment: this.form.value.comment,
        imageUrl: this.form.value.imageUrl,
      }
    }, 'confirm');
  }
 

}
