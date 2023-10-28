import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  constructor(
    private http: HttpClient
  ) { }

  getAllPosts() {
    this.http.get(BACKEND_URL + "/post");
  }

}
