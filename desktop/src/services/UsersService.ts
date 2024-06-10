import clientApi from './_config';

type LoginData = { email: string; password: string };
type RegisterData = { name: string; email: string; password: string };

export default class UsersService {
  private baseUrl: string = '/users';

  login(data: LoginData) {
    return clientApi.post(`${this.baseUrl}/login`, data);
  }

  register(data: RegisterData) {
    return clientApi.post(`${this.baseUrl}/register`, data);
  }
}
