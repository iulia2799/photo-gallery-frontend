import { Injectable } from '@angular/core';
import { Register } from '../models/register';
import {HttpClient} from '@angular/common/http';
import { LoginDto } from '../models/login-dto';
import { BACKEND_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  registerUser(user: Register) {
    const response = this.http.post(BACKEND_URL + '/register',user);
    return response;
  }
  login(user: LoginDto) {
    const response = this.http.post(BACKEND_URL + '/login',user);
    return response;
  }
}
