import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helpers';
import { LoginComponent } from './containers/login/login.component';
import { PostsComponent } from './containers/posts/posts.component';
import { AlbumsComponent } from './containers/albums/albums.component';
import { TodosComponent } from './containers/todos/todos.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: ':userId/posts',
    component: PostsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':userId/albums',
    component: AlbumsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':userId/todos',
    component: TodosComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
