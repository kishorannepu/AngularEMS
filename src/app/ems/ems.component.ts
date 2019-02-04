import { Component, OnInit ,AfterViewInit} from '@angular/core';
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'

import {HttpClient} from '@angular/common/http';
import {LogindetailsService} from '../Services/logindetails.service';
import{PmserviceService} from '../Services/pmservice.service';
import { first } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-ems',
  templateUrl: './ems.component.html',
  styleUrls: ['./ems.component.css']
})
export class EmsComponent implements OnInit,AfterViewInit {
  response:any;
  username;
  password;
  enterprisecode;

  loading;
  breakpoint;
  constructor(private router:Router,
          private _http:HttpClient,
          private logindetailsservice:LogindetailsService,
          private pmserviceservice:PmserviceService) {
            this.loading = true;
           }
           ngAfterViewInit() {
            this.router.events
                .subscribe((event) => {
                    if(event instanceof NavigationStart) {
                        this.loading = true;
                    }
                    else if (
                        event instanceof NavigationEnd || 
                        event instanceof NavigationCancel
                        ) {
                        this.loading = false;
                    }
                });
        }
  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 768) ? 1 : 2;
  }
  onSubmit(logindata){
    
          var encodedloginUsername=btoa(logindata.username);
          var encodedPassword=btoa(logindata.password);
          var encodedSiteCode=btoa(logindata.enterprisecode);

          var loginuserObj={"username":encodedloginUsername,"pass":encodedPassword,"EntCode":encodedSiteCode,"UA_Type":'Login'}




 this._http.post("http://azure.indriyn.in:9998/loginUser",loginuserObj).subscribe(loginResponse =>{
  
      this.response=loginResponse;
        
      if(this.response.success="false" && this.response.message=="Authentication failed. User not found."){
         
        alert("Invalid UserName or Password or Enterprise Code try again");
        this.username="";
        this.password="";
        this.enterprisecode="";
      }
      else if(this.response.success="false" && this.response.message=="Authentication failed. Wrong password."){
        alert("Please check Password");
        this.username="";
        this.password="";
        this.enterprisecode="";
      }
      else if(this.response.success="false" && this.response.message=="Authentication failed. Wrong Site"){
        alert("Please check EnterpriseCode");
        this.username="";
        this.password="";
        this.enterprisecode="";
      }
      else{
       
        if(loginResponse['userObj'].RoleId =="Property Manager"){
         
          this.pmserviceservice.getPMDetails(loginResponse);  
          this.router.navigate(['/pmindex'])
        }else if(loginResponse['userObj'].RoleId == "CXO"){
          this.logindetailsservice.getLoginDetails(loginResponse);
          this.router.navigate(['/mainindex']);
        }
      
      }
  
  })    

        }
  onResize(event) {
    this.breakpoint = (event.innerWidth <= 768) ? 1 : 2;
  }
}
