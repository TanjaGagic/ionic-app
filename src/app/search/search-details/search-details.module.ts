import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchDetailsPageRoutingModule } from './search-details-routing.module';

import { SearchDetailsPage } from './search-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchDetailsPageRoutingModule
  ],
  declarations: [SearchDetailsPage]
})
export class SearchDetailsPageModule {}
