import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
//import {ScrollingModule} from '@angular/cdk-experimental/scrolling'
import 'hammerjs';
import { RouteModule } from './route/route.module';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent } from './app.component';
import { EmsComponent } from './ems/ems.component';
import { MainindexComponent } from './mainindex/mainindex.component';
import { PmindexComponent } from './pmindex/pmindex.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Dash1Component } from './dash-1/dash-1.component';
import { PmdashboardComponent } from './pmdashboard/pmdashboard.component';


import { HighlightDirective } from './Directives/highlight.directive';
import { RankSqFtDirective } from './Directives/rank-sq-ft.directive';


import { DerpPipe } from './Pipes/derp.pipe';
import { PmitrPipe } from './Pipes/pmitr.pipe';
import { PmdDirective } from './Directives/pmd.directive';

import { jqxChartComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxchart';
import { BillingComponent } from './billing/billing.component';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { SecpowercunComponent } from './secpowercun/secpowercun.component';
import { CyclesComponent } from './cycles/cycles.component';

@NgModule({
  declarations: [
    AppComponent,
    EmsComponent,
    MainindexComponent,
    PmindexComponent,
    DashboardComponent,
    PmdashboardComponent,
    Dash1Component,
   
    HighlightDirective,
    RankSqFtDirective,
    PmdDirective,

    DerpPipe,
    PmitrPipe,

    jqxChartComponent,

    BillingComponent,

    SecpowercunComponent,

    CyclesComponent
   
],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    ChartsModule,
    
    RouteModule,
    AngularMaterialModule,
    ScrollingModule
  ],
entryComponents:[SecpowercunComponent,CyclesComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
