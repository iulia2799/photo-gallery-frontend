import { Component, OnInit } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { PostResponse } from 'src/app/models/post-response';
import { GalleryService } from 'src/app/services/gallery.service';
import * as base64 from 'base64-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  localToken = localStorage.getItem('loginToken');
  photos: PostResponse[] = [
  ];
  photoCategories = [...new Set(this.photos.map(photo => photo.description))];
  filteredPhotos = this.photos;
  searchTerm = '';
  selectedCategory = '';
  display: any;


  constructor(private galleryService: GalleryService) {
    console.log(this.localToken)
  }
  ngOnInit(): void {
    this.galleryService.getAllPosts().pipe(catchError((error: any) => of(error)),
      map((results: PostResponse[]) => {
        for(let item of results) {
          console.log(item.storagePath)
          item.imageString = this.decodeAndDisplayImage(item.imageString ?? '');
        }
        return results;
      })).subscribe((response) => {
        console.log(response)
        this.photos = response;
        this.decodeAndDisplayImage(this.photos[0].imageString ?? '')
      });
  }

  filterPhotos() {
    this.filteredPhotos = this.photos.filter(photo =>
      photo.description?.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedCategory === '' || photo.description === this.selectedCategory)
    );
  }

  decodeAndDisplayImage(value: string) {
    // Decode the base64 string
    const decodedBytes = base64.toByteArray(value);

    // Create a Blob from the decoded bytes
    const blob = new Blob([decodedBytes], { type: 'image/jpeg' }); // Adjust the type based on your image format

    // Create a data URL from the Blob
    const imageUrl = URL.createObjectURL(blob);

    // Set the data URL to the displayedImage property
    this.display = imageUrl;

    return imageUrl;
  }

}
