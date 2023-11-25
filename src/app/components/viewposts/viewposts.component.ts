import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-viewposts',
  templateUrl: './viewposts.component.html',
  styleUrls: ['./viewposts.component.scss']
})
export class ViewpostsComponent implements OnInit{

  constructor(private router: Router, private route: ActivatedRoute){
    console.log(this.route.snapshot.data['id']);
  }

  ngOnInit(): void {

  }

}
