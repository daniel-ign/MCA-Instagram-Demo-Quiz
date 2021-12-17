import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private imageService: ImagesService,
    private spinner: NgxSpinnerService) { }

  
  editClicked: boolean = this.imageService.isEdited;
  cancelClicked: boolean  = false;
  deleteClicked: boolean = false;
  isLoading: boolean = true;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getImage(id);     
    }

    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
      this.isLoading = false;
    }, 3000);
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
    if(!this.cancelClicked){
      this.cancelClicked = true;
    }
    this.editClicked = false;
    this.ngOnInit();
  }

  onSubmit(form: NgForm): void{
    if(form.valid){
      console.log(form.value);
      this.image!.title = form.value.title;
      this.image!.albumId = form.value.albumId;
      this.image!.url = form.value.url;
      this.image!.thumbnailUrl = form.value.thumbnailUrl;
      this.imageService.editImage(this.image!);

      this.spinner.show();

      setTimeout(() => {
        this.spinner.hide();
        this.router.navigate(['/images']);
      }, 1500);
      
      
    }
  }

  delete(id: number): void{
    if(confirm("Are you sure you want to delete this image?")){

      this.imageService.deleteImage(id);
      this.spinner.show();

      setTimeout(() => {
        this.spinner.hide();
        this.router.navigate(['/images']);
      }, 3000);
      
    }
    else{
      console.log("Image WAS NOT deleted");
    }
  }
}
