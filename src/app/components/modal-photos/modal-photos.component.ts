import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { AlbumsService } from '../../services';
import { Photo } from '../../models';

interface DialogData {
  albumId: number;
}

@Component({
  selector: 'app-modal-photos',
  templateUrl: './modal-photos.component.html',
  styleUrls: ['./modal-photos.component.scss']
})
export class ModalPhotosDialogComponent implements OnInit {
  public photos$: Observable<Array<Photo>>;

  constructor(
    private albumsService: AlbumsService,
    public dialogRef: MatDialogRef<ModalPhotosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.photos$ = this.albumsService
      .getPhotosOfAlbum(this.data.albumId)
      .pipe(first());
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
