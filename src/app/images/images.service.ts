import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { IImage } from './image';
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private imageUrl: string = "http://jsonplaceholder.typicode.com/photos";
  images: IImage[] = [];
  isDeleted: boolean = false;
  deletedId: number = 0;
  isEdited: boolean = false;
  editId: number = 0;
  editedImage?: IImage;
  isUploaded: boolean = false;
  uploadId: number = 0;
  uploadedImage?: IImage;

  constructor(private http: HttpClient) { }

  getImages(): Observable<IImage[]>{
    return this.http.get<IImage[]>(this.imageUrl).pipe(
      tap(data => this.images=data),
      catchError(this.handleError)
    );
  }

  getImage(id: number): Observable<IImage | undefined> {
    return this.getImages()
      .pipe(
        map((images: IImage[]) => images.find(i => i.id === id))
      );
  }

  deleteImage(id: number): Observable<IImage> {
    if(!this.isDeleted){
      this.isDeleted = true;
    }
    this.deletedId = id;
    return this.http.delete<IImage>(`${this.imageUrl}/${id}`).pipe(
      catchError(this.handleError)   
    );
  }

  editImage(image: IImage): Observable<IImage>{
    if(!this.isEdited){
      this.isEdited = true;
    }
    this.editId = image.id;
    this.editedImage = image;
    return this.http.put<IImage>(`${this.imageUrl}/${this.editId}`,image).pipe(
      catchError(this.handleError)  
    );
  }

  uploadImage(image: IImage): Observable<IImage>{
    if(!this.isUploaded){
      this.isUploaded = true;
    }
    this.uploadId = image.id;
    this.uploadedImage = image;
    return this.http.post<IImage>("https://jsonplaceholder.typicode.com/posts",image).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage = '';
    if(err.error instanceof ErrorEvent){
      errorMessage = `An Error Occurred:  ${err.error.message}`;
    } else{
      errorMessage = `Server Returned Code: ${err.status}, error message is: ${err.message}` 
    }
    console.error(errorMessage);
    return throwError(errorMessage)
  }
}
