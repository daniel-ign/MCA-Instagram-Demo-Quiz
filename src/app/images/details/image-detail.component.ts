import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IImage } from '../image';
import { ImagesService } from '../images.service';

@Component({
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {

  pageTitle: string = "Image Details";
  errorMessage: string = '';
  image: IImage | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private imageService: ImagesService) { }

  
  editClicked: boolean = this.imageService.isEdited;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getImage(id);     
    }
  }

  onBack(): void {
    this.router.navigate(['/images']);
  }

  getImage(id: number): void {
    this.imageService.getImage(id).subscribe({
      next: image => this.image = image,
      error: err => this.errorMessage = err
    });
  }

  edit(): void{
    this.editClicked = true;
  }
  cancel(): void{
    this.editClicked = false;
    this.ngOnInit();
  }

  onSubmit(form: NgForm): void{
    if(form.valid){
      this.editClicked = false;
      console.log(form.value);
      this.image!.title = form.value.title;
      this.image!.albumId = form.value.albumId;
      this.image!.url = form.value.url;
      this.image!.thumbnailUrl = form.value.thumbnailUrl;
      this.imageService.editImage(this.image!);
      this.router.navigate(['/images']);
    }
  }

  delete(id: number): void{
    if(confirm("Are you sure you want to delete this image?")){
      this.imageService.deleteImage(id);
      this.router.navigate(['/images']);
    }
    else{
      console.log("Image WAS NOT deleted");
    }
  }
}
