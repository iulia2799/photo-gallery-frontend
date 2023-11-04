import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryService } from '../../../services/gallery.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(public route: ActivatedRoute, public service: GalleryService, public router: Router) {
  }

  ngOnInit(): void {
    // this.service.getAllPosts().subscribe(data => {
    //   console.log(data)
    // });
  }
  

  clickOnLogin() {
    this.router.navigate(['login'],{
      relativeTo: this.route.parent
    });
  }

  clickOnRegister() {
    this.router.navigate(['register'],{
      relativeTo: this.route.parent
    });
  }

}
