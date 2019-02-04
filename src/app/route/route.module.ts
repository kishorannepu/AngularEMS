import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule,Routes,PreloadAllModules} from '@angular/router';


import { MainindexComponent } from '../mainindex/mainindex.component';
import { EmsComponent } from '../ems/ems.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Dash1Component } from '../dash-1/dash-1.component';
import { PmindexComponent } from '../pmindex/pmindex.component';
import { PmdashboardComponent } from '../pmdashboard/pmdashboard.component';
import { BillingComponent } from '../billing/billing.component';




const appRoutes: Routes =[
  
  {path:"pmindex",component:PmindexComponent,
  children:[{path:"pmdashboard",component:PmdashboardComponent},
  {path:"billing",component:BillingComponent},
  {path:'',redirectTo:'pmdashboard',pathMatch:'full'}]},
  
  {path:"mainindex",component:MainindexComponent,
  children:[{path:"dashboard",component:DashboardComponent},
            {path:"maindashboard",component:Dash1Component},
   { path: '', redirectTo: 'dashboard', pathMatch: 'full' }]},
             
  {path:'**',component:EmsComponent},
 
 
];

//, preloadingStrategy: PreloadAllModules

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes,{useHash:true},
      )
  ],
  declarations: [],
  exports:[RouterModule]
})
export class RouteModule { }
