export default interface Song {
  id: number;
  artistId: number;
  title: string;
  album: string;
  genre: string;
  releaseDate: string;
  coverImg: string;
  cloudinaryPublicId: string;
  cloudinarySecureUrl: string;
  createdAt: string;
  updatedAt: string;
}
