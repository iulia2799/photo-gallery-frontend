import { Component, OnInit } from '@angular/core';
import { catchError, finalize, map, of } from 'rxjs';
import { PostResponse } from 'src/app/models/post-response';
import { GalleryService } from 'src/app/services/gallery.service';
import * as base64 from 'base64-js';
import { ActivatedRoute, Router } from '@angular/router';

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
  isLoading: boolean = true;


  constructor(private galleryService: GalleryService, private router: Router, private route: ActivatedRoute) {
    console.log(this.localToken)
  }
  ngOnInit(): void {
    this.galleryService.getAllPosts().pipe(catchError((error: any) => of(error)),
      map((results: PostResponse[]) => {
        for(let item of results) {
          item.imageString = this.decodeAndDisplayImage(item.imageString ?? '');
        }
        return results;
      }), finalize(() => this.isLoading = false)).subscribe((response) => {
        console.log(response)
        this.photos = response;
      });
  }

  filterPhotos() {
    this.filteredPhotos = this.photos.filter(photo =>
      photo.uid?.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedCategory === '' || photo.uid === this.selectedCategory)
    );
  }

  decodeAndDisplayImage(value: string): string {
    // Decode the base64 string
    const decodedBytes = base64.toByteArray(value);
  
    // Create a Blob from the decoded bytes
    const blob = new Blob([decodedBytes], { type: 'image/jpeg' }); // Adjust the type based on your image format
  
    // Create a data URL from the Blob
    const imageUrl = URL.createObjectURL(blob);
  
    return imageUrl;
  }

  goToCreate() {
    this.router.navigate(['../create'],{
      relativeTo: this.route.parent
    });
  }

  goToView(id: string) {
    if(id === '') return;
    this.router.navigate(['../view',id], {
      relativeTo: this.route.parent
    })
  }

}
