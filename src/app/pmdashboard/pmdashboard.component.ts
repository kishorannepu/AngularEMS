import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material'
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { PmserviceService } from '../Services/pmservice.service';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import {SecpowercunComponent} from '../secpowercun/secpowercun.component'
import {CyclesComponent} from '../cycles/cycles.component'
@Component({
  selector: 'app-pmdashboard',
  templateUrl: './pmdashboard.component.html',
  styleUrls: ['./pmdashboard.component.css']
})
export class PmdashboardComponent implements OnInit {
  error
  response;
  userresponse;
  nodetime;
  nodeid;
  latestpower;
  EnergyCostPerUnit;
  TodayEngergyCost;
  TodayEngergyvalue;
  dayenergyvaluepercentage;
  dayenergycostpercentage;
  TotalMonthsConsumUpto = 0;
  TotallastMonthsConsumUpto = 0;
  TotalMonthsConsumCost;
  totalmins = [];
  totlahours = [];
  totalhours = [];
  ontotalmins = [];
  ontotalhours = [];
  date; dates = [];
  TotallastMonthsConsumUptoCast;
  EnergyValInrFmt;
  EnergyValInrFmtCost;
  monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  sectiondata = []; sectiondata1=[];sectioncal = [];sectioncal1=[]
  breakpoint: number;
  color; colors = [];
  page = 1;
  sectiontype = []
  nohrs = "";
  nomins = "";
  hrs = "hrs";
  mins = "mins";
  dash = "- - -";
  status = [];
  bgcolor;
  bgcolors = [];
  cycle = [];
  cycles = [];
  totalcycles = [];
  noOfSpikes=[]
  hourswithdecimal = [];
  constructor(private breakpointObserver: BreakpointObserver,
    private pmserviceservice: PmserviceService,
    private matdailog: MatDialog) { }
    status1=true;
  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 480) ? 1 : 3;
    this.pmserviceservice.LoadSites().subscribe(data => {
      this.response = data;
      console.log("nodeid")
     
      this.pmserviceservice.LoadSitesCorsData(this.response).subscribe(data => {
        this.userresponse = data;
        
        this.nodeid = this.userresponse[0].SensLiveData.node[0].nid;
        console.log(this.userresponse)
        for (let key in this.userresponse) {
          var liveData = this.userresponse[key].SensLiveData.node[0];
          var SensSetting = this.userresponse[key].SensSettings.Sensors;
          if (SensSetting[0].SensorType == "po") {

            this.latestpower = liveData["po4"];
            var updatedtime = liveData["udt"];

            this.nodetime = new Date(updatedtime * 1000);
           
          }


        }


      },
        error => {
          this.error = error;
        })
      this.pmserviceservice.loadEnergyCost(this.response).subscribe(data => {


        this.EnergyCostPerUnit = parseFloat(data[0].CostPerUnit);


        this.pmserviceservice.loadTodayEngegyValue(this.nodeid).subscribe(data => {


var x=data;
console.log(data)
          if (x != null) {
            this.TodayEngergyvalue = data['TodayConsumEng'].toFixed(1);
            this.TodayEngergyCost = Math.round(this.TodayEngergyvalue * this.EnergyCostPerUnit);
          }
          else {
            this.TodayEngergyvalue = "--";
            this.TodayEngergyCost = "--";
          }

          this.pmserviceservice.firstDivUnitsFunc(this.TodayEngergyvalue, this.nodeid).subscribe(data => {

            var x=data;
            var EnergyData1 = [];
            var lstmnthsEnergyColumnChart = [];

            if (x.length != 0) {

            for (let ee in data) {
             
              var firstNode = data[ee].first;
              var lastNode = data[ee].last;

              var EnergyValEn = (Math.abs(parseFloat(lastNode["endValue"]) - parseFloat(firstNode["startvalue"])));

              var EnergyVal = parseFloat(EnergyValEn.toFixed(1));

              if (EnergyVal) {
                this.TotalMonthsConsumUpto = this.TotalMonthsConsumUpto + EnergyVal;
              } else {
                this.TotalMonthsConsumUpto = 0;
              }


            }
          }
            this.TotalMonthsConsumCost = Math.round(this.TotalMonthsConsumUpto * this.EnergyCostPerUnit);


            this.pmserviceservice.yesterDayUnitsMnyFun(this.nodeid).subscribe(data => {
             console.log("yesterday")
              console.log(data)
              if(data.length > 0){
                var firstNode = data[0].first;
                var lastNode = data[0].last;
  
                var dtHist = new Date(firstNode.startTime * 1000);
  
                var EnergyValEn = (Math.abs(parseFloat(lastNode["endValue"]) - parseFloat(firstNode["startvalue"])));
  
  
  
                var EnergyVal = parseFloat(EnergyValEn.toFixed(1));
  
                this.EnergyValInrFmt = Math.round(EnergyVal);
                this.EnergyValInrFmtCost = this.EnergyValInrFmt * this.EnergyCostPerUnit;
                this.dayenergyvaluepercentage = ((this.EnergyValInrFmt - this.TodayEngergyvalue) / this.EnergyValInrFmt) * 100;
                this.dayenergycostpercentage = ((this.EnergyValInrFmtCost - this.TodayEngergyCost) / this.EnergyValInrFmtCost) * 100;

              }else{
                this.EnergyValInrFmt = "- - -";
                this.EnergyValInrFmtCost = "- - -";
                this.dayenergyvaluepercentage = "- - -";
                this.dayenergycostpercentage ="- - -";
              }
            

              this.pmserviceservice.lastMonthConsUnitsVsMny(this.nodeid).subscribe(data => {

                var EnergyData1 = [];
                var lstmnthsEnergyColumnChart = [];


                for (let ee in data) {
                  var firstNode = data[ee].first;
                  var lastNode = data[ee].last;

                  var dtHist = new Date(firstNode.startTime * 1000);
                  var EnergyValEn = (Math.abs(parseFloat(lastNode["endValue"]) - parseFloat(firstNode["startvalue"])));



                  var EnergyVal = parseFloat(EnergyValEn.toFixed(1));

                  if (EnergyVal) {
                    this.TotallastMonthsConsumUpto = this.TotallastMonthsConsumUpto + EnergyVal;
                  }
                  else {
                    this.TotallastMonthsConsumUpto = 0;
                  }
                }

                this.TotallastMonthsConsumUptoCast = Math.round(this.TotallastMonthsConsumUpto * this.EnergyCostPerUnit);


              },
                error => {
                  this.error = error;
                })
              this.pmserviceservice.sectionsData(this.response).subscribe(data => {
                  
                  console.log(data)

                // for (let i = 0; i < data[0]['SectionData'].length; i++) {

                 
                //   for (let j = 0; j < data[0]['SectionCal'].length; j++) {

                //     if (data[0]['SectionData'][i].SGMID == data[0]['SectionCal'][j].SectionID) {
                //       this.sectioncal1.push(data[0]['SectionCal'][j])
                //       this.sectiondata1.push(data[0]['SectionData'][i])
                //     }
                //   }

                // }
              data[0]['SectionData'].filter(a=>{
                data[0]['SectionCal'].filter(b=>{
                  if(a.SGMID==b.SectionID){
                      this.sectioncal.push(b)
                      this.sectiondata.push(a)
                  }
                })
              },
              this.status1=false
              )

                console.log(this.sectioncal1)
                console.log(this.sectioncal)
                for (let i = 0; i < data[0]['SectionData'].length; i++) {


                  if (data[0]['SectionData'][i]['SectionType'] == "AC lines (Split AC)") {
                    this.sectiontype.push(data[0]['SectionData'][i]['SectionType']);
                    this.status.push(true);
                  }
                  else {
                    this.sectiontype.push("");
                    this.status.push(false);
                  }
                  let cyc = this.sectioncal[i]['noOfCycles'];
                  this.noOfSpikes.push(this.sectioncal[i]['noOfPeaks'])
                  this.cycles.push(cyc);
                 
                  let totaltimemin = this.sectioncal[i]['offTotalTime'] + this.sectioncal[i]['onTotalTime'];
                  let totalmins = totaltimemin / 60;
                  let hr = totalmins / 60;


                  this.totalcycles.push(this.cycle);

                  let hours = Math.floor(hr);

                  let minutes = Math.round(totalmins % 60);
                  var result = (hours < 10 ? "0" + hours : hours);
                  result += "hrs" + " " + (minutes < 10 ? "0" + minutes : minutes);
                  this.totalhours.push(hours)
                  this.totalmins.push(minutes);
                  let totalonmins = this.sectioncal[i]['onTotalTime'] / 60;
                  let hr1 = totalonmins / 60;

                  this.hourswithdecimal.push(hr1);
                 
                  if (this.hourswithdecimal[i] != 0) {
                    this.cycle.push(this.cycles[i] / this.hourswithdecimal[i]);
                  } else {
                    this.cycle.push(0);
                  }

                  let onhours = Math.floor(hr1);
                  let onminutes = Math.round(totalonmins % 60);
               
                  var onresult = (onhours < 10 ? "0" + onhours : onhours);
                  onresult += "." + (onminutes < 10 ? "0" + onminutes : onminutes);




                  if (data[0]['SectionData'][i]['SectionType'] == "AC lines (Split AC)") {
                    this.ontotalhours.push(onhours);
                    this.ontotalmins.push(onminutes);
                  }
                  else {
                    this.ontotalhours.push("");
                    this.ontotalmins.push("");
                  }
                  //  (this.sectionresdata[0][i]['onTotalTime'])/60;
                  // this.ontime.push(mins);  
                  this.date = new Date(this.sectioncal[i].cdt * 1000);
                  this.dates.push(this.date);
                  if (this.sectioncal[i]['loadPercentage'] > 80) {
                    this.color = "warn"
                  } else if (this.sectioncal[i]['loadPercentage'] > 40) {
                    this.color = "primary"
                  }
                  else { this.color = "accent" }
                  this.colors.push(this.color);

                  
                }


              },
                error => {
                  this.error = error;
                })
            })
          })

        },
          error => {
            this.error = error;
          })

      },
        error => {
          this.error = error;
        })
    },
      error => {
        this.error = error;
      })

  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 480) ? 1 : 3;
  }
  sectionLineChartClick(siteid,sectionid,entcode,SectionName){
    
    this.pmserviceservice.sectionEnergyCon(sectionid,siteid,entcode,SectionName)
  const dailogconfig=new MatDialogConfig()
  dailogconfig.disableClose=true;
 
  dailogconfig.width="80%";
  dailogconfig.height="70%";
this.matdailog.open(SecpowercunComponent,dailogconfig);
}

cyclesPerMonth(siteid,sectionid,entcode,SectionName){
  
  this.pmserviceservice.cyclesPerMon(sectionid,siteid,entcode,SectionName)
  
  const dailogconfig=new MatDialogConfig()
  dailogconfig.disableClose=true;
 
  dailogconfig.width="80%";
  dailogconfig.height="60%";
this.matdailog.open(CyclesComponent,dailogconfig);

}
}
