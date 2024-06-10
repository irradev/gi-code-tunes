import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { ArtistsService } from '../services/artists.service';
import Artist from '../models/artist.interfase';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.page.html',
  styleUrls: ['./artist-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ArtistDetailPage implements OnInit {
  artist: Artist | null = null;

  activatedRoute = inject(ActivatedRoute);
  artistsService = inject(ArtistsService);

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      const response = await this.artistsService.getArtist(params['artistId']);
      this.artist = response;
    });
  }
}
