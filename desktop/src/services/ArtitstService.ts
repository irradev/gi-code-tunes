import clientApi from './_config';
import { getToken } from './_utils';

interface CreateArtist {
  name: string;
  bio: string;
  genre: string;
  coverImg: string;
}

export default class ArtistsService {
  private baseUrl = '/artists';

  getAll() {
    return clientApi.get(`${this.baseUrl}/own`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  }

  getById(id: string) {
    return clientApi.get(`${this.baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  }

  create(data: CreateArtist) {
    return clientApi.post(this.baseUrl, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  }
}
