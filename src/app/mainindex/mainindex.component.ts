import { Component ,OnInit,Input} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {LogindetailsService} from '../Services/logindetails.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mainindex',
  templateUrl: './mainindex.component.html',
  styleUrls: ['./mainindex.component.css']
})
export class MainindexComponent implements OnInit {
  @Input() userdetails;
  sitename;
  SiteName;
  loginuserdetails;
  displayname;
  username;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver,
    private logindetailsservice:LogindetailsService,
    private router:Router,
    ) {}
  

    ngOnInit(){
     
      this.loginuserdetails=this.logindetailsservice.sendLoginData();
      this.displayname=this.logindetailsservice.sendLoginUserData();
  
  
 
  if(this.displayname != null  && this.displayname != undefined ){
    
    this.username=this.displayname['userObj']['DisplayName'];
    localStorage.setItem('displayname',this.displayname['userObj'].DisplayName);
  }
  else{
    this.username=localStorage.getItem('displayname');

  }
 
}

logout(){
  localStorage.removeItem('displayname');
this.router.navigate([''])
}
  



}
