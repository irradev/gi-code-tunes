import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import Song from '../models/song.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SongsService {
  private baseUrl = 'http://localhost:3000/api/songs';

  private httpClient = inject(HttpClient);

  searchSongs(query: string) {
    return firstValueFrom(
      this.httpClient.post<Song[]>(`${this.baseUrl}/search`, {
        search: query || '',
      })
    );
  }
}
