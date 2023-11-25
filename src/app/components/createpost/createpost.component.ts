import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as base64 from 'base64-js';
import { PostRequest } from 'src/app/models/post-request';
import { GalleryService } from 'src/app/services/gallery.service';
import { TOKEN } from 'src/app/utils/constants';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss']
})
export class CreatepostComponent implements OnInit{

  imageForm: FormGroup;
  localToken?: string | null;

  constructor(private fb: FormBuilder, private service: GalleryService) {
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
    let body: PostRequest = {
      ...this.imageForm.value
    };
    this.service.post(body).pipe().subscribe(response => {
      console.log(response)
    });
  }
  

}
