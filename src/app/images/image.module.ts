import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImagesComponent } from './images.component';
import { SharedModule } from '../shared/shared.module';
import { ImageDetailComponent} from './details/image-detail.component';
import { ImageDetailGuard } from './details/image-detail.guard';
import { ImageUploadComponent } from './upload/image-upload.component';



@NgModule({
  declarations: [
    ImagesComponent,
    ImageDetailComponent,
    ImageUploadComponent
  ],
  imports: [
    RouterModule.forChild([
      {path:'images', component: ImagesComponent},
      {path:'images/:id', 
      canActivate: [ImageDetailGuard],
      component: ImageDetailComponent},
      {path:'image-upload', component: ImageUploadComponent}
    ]),
    SharedModule
  ]
})
export class ImageModule { }
