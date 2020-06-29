import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { AlbumsService } from '../../services';
import { Album } from '../../models';
import { ModalPhotosDialogComponent } from '../../components/modal-photos/modal-photos.component';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  albums$: Observable<Array<Album>>;

  constructor(private albumsService: AlbumsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.albums$ = this.albumsService.getAlbums().pipe(first());
  }

  public openPhotosModal(albumId: number): void {
    this.dialog.open(ModalPhotosDialogComponent, {
      width: '750px',
      data: { albumId }
    });
  }
}
