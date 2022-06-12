import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchDetailsPage } from './search-details.page';

const routes: Routes = [
  {
    path: '',
    component: SearchDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchDetailsPageRoutingModule {}
