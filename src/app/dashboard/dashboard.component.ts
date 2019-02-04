import { Component, OnInit, OnDestroy } from '@angular/core';
import { LogindetailsService } from '../Services/logindetails.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  getdata: any[] = [];
  userObj: any;
  getSensData: any[] = [];
  show = false;
  public responseData1: any=[];
  public responseData2: any;
  public responseData3: any;
  todayDate = [];
  todayDay = [];
  todayadate;
  dayCount;
  color;
  colors = [];
  temp = [22, 21, 24,23];
  dayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  breakpoint: number;
  lengthOfData;
  constructor(private logindetailsservice: LogindetailsService,
   ){ }

  ngOnInit() {
   
    this.breakpoint = (window.innerWidth <= 768) ? 1 : 2;
    this.logindetailsservice.sendLoginData().subscribe(data => {
      this.getdata = data;

      this.logindetailsservice.EMSDashboardSensCalinit(this.getdata).pipe(first()).subscribe(data => {
       this.lengthOfData=data.length;
        for(let i=0;i<this.lengthOfData;i++){
          this.responseData1.push(data[i]);
        }
  


        this.todayadate = new Date(data[0][0]['udt'] * 1000)
        for (let i = 0; i < data.length; i++) {
          this.todayDate.push(new Date(data[i][0]['udt'] * 1000));

          if (this.responseData1[i][0].loadPercentage > 80) {
            this.color = "warn"
          } else if (this.responseData1[i][0].loadPercentage > 40) {
            this.color = "primary"
          }
          else { this.color = "accent" }

          this.colors.push(this.color);
        }
        for (let i = 0; i < data.length; i++) {
          this.todayDay.push(this.todayDate[i].getDay());
        }

        this.dayCount = this.dayArray[this.todayDay[0]];
        
      })
     })






   

  }
  nodeMacIdIndex(index,SiteName){
       
this.logindetailsservice.nodemacIdindex(index,SiteName);
  }
  onResize(event) {
    this.breakpoint = (event.innerWidth <= 768) ? 1 : 2;
  }

}



