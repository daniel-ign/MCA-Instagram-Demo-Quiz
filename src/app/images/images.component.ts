import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagesService } from './images.service';
import { IImage } from './image';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit, OnDestroy{

  pageTitle: string = "Image List";
  sub!: Subscription;
  errorMessage: string = "";
  images: IImage[] = [];

  constructor(private imageService: ImagesService,
    private router: Router) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    if(this.imageService.isDeleted){
      const id = Number(this.imageService.deletedId);
      this.sub = this.imageService.deleteImage(id).subscribe(
        () => alert(`Image with id: ${id} was deleted`),
        (err) => console.log(err)
      );
      this.imageService.isDeleted = false;
    }  

    if(this.imageService.isEdited){
      this.sub = this.imageService.editImage(this.imageService.editedImage!).subscribe(
        () => alert(`Image with id: ${this.imageService.editedImage!.id} was edited`),
        (err) => console.log(err)
      );
      this.imageService.isEdited = false;
    }

    if(this.imageService.isUploaded){
      this.sub = this.imageService.uploadImage(this.imageService.uploadedImage!).subscribe(
        () => alert(`Image with id: ${this.imageService.uploadedImage!.id} was uploaded`),
        (err) => console.log(err)
      );
      this.imageService.isUploaded = false;
    }

    this.sub = this.imageService.getImages().subscribe({
      next: images => {
        this.images = images;
        console.log(images)
      },
      error: err => this.errorMessage = err
    });

  }

  uploadImage(): void {
    this.router.navigate(['/image-upload']);
  }
}
