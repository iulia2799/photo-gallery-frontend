import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, catchError, finalize, map, of, takeUntil } from 'rxjs';
import { PostResponse } from 'src/app/models/post-response';
import { GalleryService } from 'src/app/services/gallery.service';
import { ActivatedRoute, Router } from '@angular/router';
import { decodeAndDisplayImage } from 'src/app/utils/functions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  localToken = localStorage.getItem('loginToken');
  photos: PostResponse[] = [
  ];
  photoCategories = [...new Set(this.photos.map(photo => photo.description))];
  filteredPhotos: PostResponse[] = [];
  searchTerm = '';
  selectedCategory = '';
  display: any;
  isLoading: boolean = true;
  destroy$: Subject<void> = new Subject<void>();


  constructor(private galleryService: GalleryService, private router: Router, private route: ActivatedRoute) {
    console.log(this.localToken)
  }
  ngOnInit(): void {
    this.galleryService.getAllPosts().pipe(takeUntil(this.destroy$), catchError((error: any) => of(error)),
      map((results: PostResponse[]) => {
        for(let item of results) {
          item.imageString = decodeAndDisplayImage(item.imageString ?? '');
        }
        return results;
      }), finalize(() => this.isLoading = false)).subscribe((response) => {
        console.log(response)
        this.photos = response;
        this.filteredPhotos = response;
      });
  }

  filterPhotos() {
    const filteredPhotos = this.photos.filter(photo =>
      photo?.description?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.filteredPhotos = filteredPhotos;
  }

  goToCreate() {
    this.router.navigate(['../create'],{
      relativeTo: this.route.parent
    });
  }

  goToView(id: string) {
    console.log(id)
    if(id === '') return;
    this.router.navigate(['../view',id], {
      relativeTo: this.route.parent
    })
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

}
