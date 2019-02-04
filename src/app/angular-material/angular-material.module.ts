import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';

import * as material from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    material.MatToolbarModule,
    material.MatButtonModule,
    material.MatSidenavModule,
    material.MatIconModule,
    material.MatListModule,
    material.MatGridListModule,
    material.MatCardModule,
    material.MatMenuModule,
    material.MatProgressSpinnerModule,
    material.MatFormFieldModule,
    material.MatInputModule,
    material.MatDividerModule,
    material.MatTooltipModule,
    material.MatButtonToggleModule,
    material.MatDatepickerModule,
    material.MatNativeDateModule,
    material.MatSlideToggleModule,
    material.MatDialogModule,
    material.MatToolbarModule
   ],
  declarations: [],
  exports:[ 
    LayoutModule,
    material.MatToolbarModule,
    material.MatButtonModule,
    material.MatSidenavModule,
    material.MatIconModule,
    material.MatListModule,
    material.MatGridListModule,
    material.MatCardModule,
    material.MatMenuModule,
    material.MatProgressSpinnerModule,
    material.MatFormFieldModule,
    material.MatInputModule,
    material.MatDividerModule,
    material.MatTooltipModule,
    material.MatButtonToggleModule,
    material.MatDatepickerModule,
    material.MatNativeDateModule,
    material.MatSlideToggleModule,
    material.MatDialogModule,
    material.MatToolbarModule
   ],
   providers: [material.MatNativeDateModule]
})
export class AngularMaterialModule { }
