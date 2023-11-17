import { Injectable } from '@angular/core';
import { Register } from '../models/register';
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import { LoginDto } from '../models/login-dto';
import { BACKEND_URL, LOGIN_PATH, REGISTER_PATH } from '../utils/constants';
import { RequestBuilder } from './request-builder';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  registerUser(user: Register) {
    const rb = new RequestBuilder(BACKEND_URL, REGISTER_PATH, 'post');
    const response = this.http.post(BACKEND_URL + REGISTER_PATH,user);
    console.log(response)
    return response;
  }
  login(user: LoginDto) {
    const response = this.http.post(BACKEND_URL + '/PhotoGallery/login',user,{
      responseType: 'text'
    });
    return response;
  }
}

