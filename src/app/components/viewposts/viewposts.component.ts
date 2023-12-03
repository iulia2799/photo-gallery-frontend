import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { PostResponse } from 'src/app/models/post-response';
import { GalleryService } from 'src/app/services/gallery.service';
import { decodeAndDisplayImage } from 'src/app/utils/functions';

@Component({
  selector: 'app-viewposts',
  templateUrl: './viewposts.component.html',
  styleUrls: ['./viewposts.component.scss']
})
export class ViewpostsComponent implements OnInit, OnDestroy{

  image: any;
  post!: PostResponse;
  id: string;
  destroy$: Subject<void> = new Subject<void>();

  constructor(private router: Router, private route: ActivatedRoute, private service: GalleryService){
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.service.getPostById(this.id).pipe(takeUntil(this.destroy$)).subscribe(response => {
      this.post = response;
      this.convertImage(this.post.imageString ?? '');
    });
  }

  convertImage(imageString: string) {
    if(imageString === '') {
      return;
    } else {
      const result = decodeAndDisplayImage(imageString);
      this.image = result;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

}
