import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxPaginationModule,
    NgxSpinnerModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    NgxSpinnerModule
  ]
})
export class SharedModule { }
