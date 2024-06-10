import Song from './Song';

export default interface Artist {
  id: number;
  name: string;
  bio: string;
  genre: string;
  coverImg: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  songs: Song[];
}
