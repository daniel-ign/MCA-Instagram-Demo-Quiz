import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IImage } from '../image';
import { ImagesService } from '../images.service';

@Component({
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  emptyImage: IImage = {
    albumId: 0,
    id: this.imageService.images.length + 1,
    title: "",
    url: "",
    thumbnailUrl: ""
  }

  pageTitle: string = "Upload an Image";
  image: IImage = {...this.emptyImage};
  filePath: any = "";
  imageSrc: any;

  constructor(private router: Router,
    private imageService: ImagesService) { }

  handleFileInput(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.filePath = file.name;

      const reader = new FileReader();
      
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
  }
  }


  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    if(form.valid){
      this.image.title = form.value.title;
      this.image.albumId = form.value.albumId;
      this.image.url = this.filePath;
      this.image.thumbnailUrl = this.filePath;
      console.log(this.image);
      this.imageService.uploadImage(this.image);
      this.router.navigate(['/images']);
    }
  }

  onBack(): void{
    this.router.navigate(['/images']);
  }

  cancel(form: NgForm): void{
    form.resetForm();
    form.valid == true;
    this.filePath = "";
    this.imageSrc = null;
  }
}
