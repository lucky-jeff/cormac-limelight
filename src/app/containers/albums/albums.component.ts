import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { AlbumsService } from '../../services';
import { Album } from '../../models';
import { ModalPhotosDialogComponent } from '../../components/modal-photos/modal-photos.component';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit, OnDestroy {
  albumsSub$: Subscription;
  originalAlbums: Array<Album>;
  albums: Array<Album>;
  sortOrder = null;
  loading = false;

  constructor(private albumsService: AlbumsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loading = true;
    this.albumsSub$ = this.albumsService.getAlbums().subscribe(
      (albums: Array<Album>) => {
        this.originalAlbums = [...albums];
        this.albums = albums;
        this.loading = false;
      },
      (error: any) => {
        this.originalAlbums = [];
        this.albums = [];
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.albumsSub$.unsubscribe();
  }

  toggleDescSortOrder(): void {
    if (!this.sortOrder || this.sortOrder === 'asc') {
      this.sortOrder = 'desc';
      this.albums = this.albums.sort((a, b) => (a.title > b.title ? -1 : 1));
    } else {
      this.sortOrder = null;
      this.albums = [...this.originalAlbums];
    }
  }

  toggleAscSortOrder(): void {
    if (!this.sortOrder || this.sortOrder === 'desc') {
      this.sortOrder = 'asc';
      this.albums = this.albums.sort((a, b) => (a.title < b.title ? -1 : 1));
    } else {
      this.sortOrder = null;
      this.albums = [...this.originalAlbums];
    }
  }

  public openPhotosModal(albumId: number): void {
    this.dialog.open(ModalPhotosDialogComponent, {
      width: '750px',
      data: { albumId }
    });
  }
}
