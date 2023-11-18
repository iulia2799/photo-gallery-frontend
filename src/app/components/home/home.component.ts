import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { GalleryService } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  localToken = localStorage.getItem('loginToken');
  photos: any[] = [
    { url: 'path/to/photo1.jpg', cols: 1, rows: 1, alt: 'Photo 1', description: 'Description for Photo 1' },
    { url: 'path/to/photo2.jpg', cols: 2, rows: 2, alt: 'Photo 2', description: 'Description for Photo 2' },
    // Add more photos as needed
  ];

  constructor(private galleryService: GalleryService){
    console.log(this.localToken)
  }
  ngOnInit(): void {
    this.galleryService.getAllPosts().pipe(catchError((error: any) => of(error))).subscribe((response) => {
      console.log(response)
    })
  }

}
