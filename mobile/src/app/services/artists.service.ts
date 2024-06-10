import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import Artist from '../models/artist.interfase';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  private baseUrl = 'http://localhost:3000/api/artists';

  private httpClient = inject(HttpClient);

  getArtists() {
    return firstValueFrom(this.httpClient.get<Artist[]>(this.baseUrl));
  }

  getArtist(id: number) {
    return firstValueFrom(this.httpClient.get<Artist>(`${this.baseUrl}/${id}`));
  }

  searchArtists(query: string) {
    return firstValueFrom(
      this.httpClient.post<Artist[]>(`${this.baseUrl}/search`, {
        search: query || '',
      })
    );
  }
}
