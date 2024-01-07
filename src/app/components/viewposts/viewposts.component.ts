import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, catchError, of, take, takeUntil } from 'rxjs';
import { PostResponse } from 'src/app/models/post-response';
import { GalleryService } from 'src/app/services/gallery.service';
import { TOKEN } from 'src/app/utils/constants';
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
    this.service.getPostById(this.id).pipe(takeUntil(this.destroy$), catchError((error: any) => {
      if(error.status === 401) {
        localStorage.removeItem(TOKEN);
        this.router.navigate(['/']);
      }
      return of(error)
    }
    )).subscribe(response => {
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

  downloadImage() {
    // Create a new anchor element
    const link = document.createElement('a');

    // Set the href attribute with the base64 data
    link.href = this.image;

    // Set the download attribute with the desired file name
    link.download = this.post.storagePath ?? "donwload.jpg";

    // Append the anchor to the document
    document.body.appendChild(link);

    // Trigger a click on the anchor element
    link.click();

    // Remove the anchor from the document
    document.body.removeChild(link);
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

}
