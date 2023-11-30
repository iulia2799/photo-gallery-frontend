import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, catchError, of, takeUntil } from 'rxjs';
import { PostRequest } from 'src/app/models/post-request';
import { GalleryService } from 'src/app/services/gallery.service';
import { TOKEN } from 'src/app/utils/constants';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss']
})
export class CreatepostComponent implements OnInit, OnDestroy{

  imageForm: FormGroup;
  localToken?: string | null;
  destroy$: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder, private service: GalleryService, private snackBar: MatSnackBar) {
    this.imageForm = this.fb.group({
      image: [''],
      description: [''],
      imageExtension: ['']
    });
    this.localToken = localStorage.getItem(TOKEN);
  }

  ngOnInit(): void {
    
  }

  onFileChange(event: any): void {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageForm.patchValue({
          image: reader.result,
          imageExtenstion: (event.target.files[0].type as string).split("/")[1]
        });
      };
    }
  }

  onSubmit(): void {
    const base64String: string | ArrayBuffer | null = this.imageForm.value.image.toString().split(',')[1];

    let body: PostRequest = {
      ...this.imageForm.value,
      image: base64String
    };
    this.service.post(body).pipe(takeUntil(this.destroy$), catchError(err => {
      return of(err);
    })).subscribe(response => {
      if(response instanceof HttpErrorResponse) {
        this.snackBar.open('Error saving the image.', 'OK', {
          duration : 5000
        });
      } else {
        this.snackBar.open('Image saved succesfully.', 'OK', {
          duration : 5000
        });
      }
    });
  }
  
  ngOnDestroy(): void {
    this.destroy$.complete();
  }

}
