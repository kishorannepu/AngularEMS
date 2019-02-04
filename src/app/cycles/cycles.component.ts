import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import { Chart} from 'chart.js'
import { PmserviceService } from '../Services/pmservice.service';
@Component({
  selector: 'app-cycles',
  templateUrl: './cycles.component.html',
  styleUrls: ['./cycles.component.css']
})
export class CyclesComponent implements OnInit {
chart=[]
status1=true;
status2=false;
sectionname;
response;
statustype="twentyfourhrs";
noofcycles=[];
cycles=[]
cycle=[];
totalcycles=[];
totalhours=[];
totalmins=[];
hourswithdecimal=[];
displaydays=[];
monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  constructor(private matdailogref:MatDialogRef<CyclesComponent>,
    private pmserviceservice:PmserviceService) { }

  ngOnInit() {

    this.pmserviceservice.displayCyclesPerMon().subscribe(data=>{
console.log(data)
this.response=data;
if(this.status1 == true){
  this.status1=true;
this.status2=false;
  for(let i=0;i<this.response.length;i++){
   
    let cyc = this.response[i]['noOfCycles'];
let udt=this.response[i]['udt']*1000;
let day=new Date(udt).getDate();
let mon=new Date(udt).getMonth();
this.displaydays.push(this.monthsArray[mon]+"-"+day)
    this.cycles.push(cyc);
   
    let totaltimemin = this.response[i]['offTotalTime'] + this.response[i]['onTotalTime'];
    let totalmins = totaltimemin / 60;
    let hr = totalmins / 60;


    //this.totalcycles.push(this.cycle);

    let hours = Math.floor(hr);

    let minutes = Math.round(totalmins % 60);
    var result = (hours < 10 ? "0" + hours : hours);
    result += "hrs" + " " + (minutes < 10 ? "0" + minutes : minutes);
    this.totalhours.push(hours)
    this.totalmins.push(minutes);
    let totalonmins = this.response[i]['onTotalTime'] / 60;
    let hr1 = totalonmins / 60;

    this.hourswithdecimal.push(hr1);
   if (this.hourswithdecimal[i] != 0) {
      this.cycle.push(Math.round(this.cycles[i] / this.hourswithdecimal[i]));
    } else {
      this.cycle.push(0);
    }








   }
}
this.status1=false;
this.status2=true;

this.cbSwitchClick(this.statustype)

})
    
    this.sectionname=this.pmserviceservice.sectionName()
   
  
}
onClose(){
  this.matdailogref.close()
  }

cbSwitchClick(type){
this.chart = new Chart('canvas', {
  type: 'bar',
  data: {
    labels: this.displaydays,
    datasets: [{
      label: 'Cycles/hr',
      data: this.cycle,
      backgroundColor:'#1e8ae3'
    }]
  },
  options: {
    scales: {
      xAxes: [{
        barPercentage: 0.4
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: false,
      labels: {
        fontColor: 'black',


      },
      strokeStyle: 'green',
      position: 'bottom',
    }
  },
  colors: [
    { // 1st Year.
      backgroundColor: 'black'
    },

  ]
});
}
}
