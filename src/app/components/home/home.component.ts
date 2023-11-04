import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  localToken = localStorage.getItem('authToken');

  constructor(){
    console.log(this.localToken)
  }

}
