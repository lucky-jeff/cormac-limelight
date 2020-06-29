import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services';
import { User } from '../../models';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  currentUser: User;
  postsLink: string;
  albumsLink: string;
  todosLink: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser$.subscribe((user: User) => {
      this.currentUser = user;
      if (user) {
        this.postsLink = `/${user.id}/posts`;
        this.albumsLink = `/${user.id}/albums`;
        this.todosLink = `/${user.id}/todos`;
      }
    });
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
