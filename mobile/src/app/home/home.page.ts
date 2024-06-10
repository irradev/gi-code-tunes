import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { ArtistsService } from '../services/artists.service';
import Artist from '../models/artist.interfase';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import Song from '../models/song.interface';
import { SongsService } from '../services/songs.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink],
})
export class HomePage {
  artistsService = inject(ArtistsService);
  songsService = inject(SongsService);

  artists: Artist[] = [];
  searchResult: { artists: Artist[]; songs: Song[] } = {
    artists: [],
    songs: [],
  };

  async ngOnInit() {
    const response = await this.artistsService.getArtists();
    this.artists = response;
  }

  onSearch($event: any) {
    if ($event.target.value === '' || $event.target.value.length < 3) {
      this.searchResult = { artists: [], songs: [] };
    } else {
      Promise.all([
        this.artistsService.searchArtists($event.target.value),
        this.songsService.searchSongs($event.target.value),
      ]).then(([artists, songs]) => {
        this.searchResult = { artists: artists, songs: songs };
      });
    }
  }
}
