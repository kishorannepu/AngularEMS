import { Component,OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PmserviceService } from '../Services/pmservice.service';
import {LogindetailsService} from '../Services/logindetails.service'
import {Router} from '@angular/router';
@Component({
  selector: 'app-pmindex',
  templateUrl: './pmindex.component.html',
  styleUrls: ['./pmindex.component.css']
})
export class PmindexComponent implements OnInit {
displayname;
username;
sitename;
SiteName;
value;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver,
    private pmserviceservice:PmserviceService,
    private logindetailsservice:LogindetailsService,
    private router:Router) {}
  
ngOnInit(){
this.displayname=this.pmserviceservice.sendLoginUserData();


if(this.displayname != null  && this.displayname != undefined ){
    
  this.username=this.displayname['userObj']['DisplayName'];
  localStorage.setItem('displayname',this.displayname['userObj'].DisplayName);
}
else{
  this.username=localStorage.getItem('displayname');

}

if (this.username == "Krishna") {
  this.SiteName = "KLM, Ameerpet";
  this.value="130px"
}
else if(this.username == "Pradeep"){
  this.SiteName = "KLM, Rajahmundry";
  this.value="130px"
}
else{
  this.SiteName = "Kalamandir, Kukatpally";
  this.value="130px"
}
}
getColor(country) { 
  
  switch (country) {
    case 'KLM, Ameerpet':
      return '150px';
    case 'KLM, Rajahmundry':
      return '120px';
    default:
      return '80px';
  }
}
logout(){
  localStorage.removeItem('displayname');
  localStorage.removeItem('EnterpriseCode');
  localStorage.removeItem('UserCode');
  localStorage.removeItem('token');
  localStorage.removeItem('sitename');
this.router.navigate([''])
}
}
