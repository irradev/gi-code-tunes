import clientApi from './_config';
import { getToken } from './_utils';

export default class SongsService {
  private baseUrl = '/songs';

  create(data: FormData) {
    return clientApi.post(this.baseUrl + '/upload	', data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  }

  deleteById(id: number) {
    return clientApi.delete(`${this.baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  }
}
