import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND_URL, GET_POSTS_PATH } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  constructor(
    private http: HttpClient
  ) {
  }

  getAllPosts() {
    return this.http.get(BACKEND_URL + GET_POSTS_PATH, {
      headers: {
        'Authorization': 'Bearer ' + (localStorage.getItem('loginToken') ?? '')
      }
    });
  }
}
