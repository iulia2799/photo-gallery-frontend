import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND_URL, GET_POSTS_PATH, TOKEN } from '../utils/constants';
import { PostRequest } from '../models/post-request';

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
        'Authorization': 'Bearer ' + (localStorage.getItem(TOKEN) ?? '')
      }
    });
  }

  post(post: PostRequest) {
    return this.http.post(BACKEND_URL + GET_POSTS_PATH, post, {
      headers: {
        'Authorization': 'Bearer ' + (localStorage.getItem(TOKEN) ?? '')
      }
    });
  }

  getPostById(id: string) {
    return this.http.get(BACKEND_URL + GET_POSTS_PATH + '/' + id, {
      headers: {
        'Authorization': 'Bearer ' + (localStorage.getItem(TOKEN) ?? '')
      }
    });
  }
}
