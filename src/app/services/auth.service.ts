import { Injectable } from '@angular/core';
import { Register } from '../models/register';
import {HttpClient} from '@angular/common/http';
import { LoginDto } from '../models/login-dto';
import { BACKEND_URL, LOGIN_PATH, REGISTER_PATH } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  registerUser(user: Register) {
    const response = this.http.post(BACKEND_URL + REGISTER_PATH,user, {
      responseType: 'text'
    });
    return response;
  }
  login(user: LoginDto) {
    const response = this.http.post(BACKEND_URL + LOGIN_PATH,user,{
      responseType: 'text'
    });
    return response;
  }
}

