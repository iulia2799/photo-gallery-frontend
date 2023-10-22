import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  backendUrl = "http://localhost:5168";

  constructor() { }
}
