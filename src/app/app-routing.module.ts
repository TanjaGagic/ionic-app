import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/homepage',
    pathMatch: 'full'
  },
  

  {
    path: 'books',
    loadChildren: () => import('./books/books.module').then(m => m.BooksPageModule),
    canLoad: [AuthGuard]
  },

  {
    path: 'homepage',
    loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepagePageModule),
    canLoad: [AuthGuard]
  },

  {
    path: 'log-in',
    loadChildren: () => import('./auth/log-in/log-in.module').then( m => m.LogInPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },

 
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
