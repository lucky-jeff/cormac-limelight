import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Album, Photo, User } from '../models';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class AlbumsService {
  currentUser: User;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  public getPhotosOfAlbum(albumId: number): Observable<Array<Photo>> {
    return this.http.get<any>(
      `${environment.apiUrl}/photos?albumId=${albumId}`
    );
  }

  public getAlbums(): Observable<Array<Album>> {
    return this.http
      .get<any>(`${environment.apiUrl}/albums?userId=${this.currentUser.id}`)
      .pipe(
        mergeMap((albums: Array<Album>) => albums),
        mergeMap((album: Album) =>
          this.getPhotosOfAlbum(album.id).pipe(
            map((photos: Array<Photo>) => ({
              ...album,
              countOfPhotos: photos.length
            }))
          )
        ),
        toArray()
      );
  }
}
