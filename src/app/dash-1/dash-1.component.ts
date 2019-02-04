import { Component, OnInit } from '@angular/core';
import { jqxChartComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxchart';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { LogindetailsService } from '../Services/logindetails.service';
import { first } from 'rxjs/operators';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { IfStmt } from '@angular/compiler';
@Component({
  selector: 'app-dash-1',
  templateUrl: './dash-1.component.html',
  styleUrls: ['./dash-1.component.css']
})
export class Dash1Component implements OnInit {
  date = new Date();
  SiteName;
 yesterdaydata;
  constructor(private logindetailsservice: LogindetailsService,
    private router: Router) {

  }
  x; chart: any; dash="- - -";
  todayDateDis;
  statustype = "twentyfourhrs";
  title = 'Bar Chart Example in Angular 4';
  nodeid1;
  nodeid2;
  nodeid3;
  responseData1=[];
  day: boolean;
  billing: boolean;
  year: boolean;
  sitename;
  todayconsumeng;
  EnergyCostPerUnit;
  TodayEngergyCost;
  EnergyValInrFmt;
  EnergyValInrFmtCost;
  dayenergyvaluepercentage;
  dayenergycostpercentage;
  TotalMonthsConsumCost;
  TotalMonthsConsumUpto = 0;
  TotallastMonthsConsumUpto = 0;
  TotallastMonthsConsumUptoCast;
  swithstatus;
  TotaltwentyfourhrsEnergy = 0;
  TotalMonthsEnergy = 0;
  TotalYearsEnergy = 0;
  response: any;
  // ADD CHART OPTIONS.

  monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  todayData1 = new Date();
  fullyear = this.todayData1.getFullYear();
  StartDatePick = 0o1 + "-" + this.monthsArray[this.todayData1.getMonth()] + "-" + this.fullyear
  startdate = new Date(this.StartDatePick);
  MnPickerFromDate = new Date(this.startdate.getFullYear(), this.startdate.getMonth(), this.startdate.getDate(), 0o0, 0o0, 0o0).getTime();
  MnPickerToDate = new Date(this.todayData1.getFullYear(), this.todayData1.getMonth(), this.todayData1.getDate(), 23, 59, 59).getTime();




  PickerFromDate = new Date(this.todayData1.getFullYear(), this.todayData1.getMonth(), this.todayData1.getDate(), 0o0, 0o0, 0o0).getTime();
  PickerToDate = new Date(this.todayData1.getFullYear(), this.todayData1.getMonth(), this.todayData1.getDate(), this.todayData1.getHours(), this.todayData1.getMinutes(), 0o0).getTime();
  dt = new Date();


  dtNow = new Date();
  YrEndDatePick = this.dtNow.getFullYear();


  stdaytoCond = 1; //dtNow.getDate()
  stmonth = 0; //dtNow.getMonth()
  styear = this.YrEndDatePick;
  startDate = new Date(this.styear, this.stmonth, this.stdaytoCond, 0o0, 0o0, 0o0).getTime();
  //console.log(startDate)
  endDate = this.dtNow.getTime();



  change() {

    //this.swithstatus=!this.swithstatus;

  }
  dateWise(value) {
    //console.log(value);

    if (value['day']) {
     
      
      this.todayData1 = new Date(value['day']);
      this.dt = new Date(value['day']);
      this.PickerFromDate = new Date(this.todayData1.getFullYear(), this.todayData1.getMonth(), this.todayData1.getDate(), 0o0, 0o0, 0o0).getTime();
      if (this.todayData1.getFullYear() == this.dt.getFullYear() && this.todayData1.getMonth() == this.dt.getMonth() && this.todayData1.getDate() == this.dt.getDate()) {
        this.PickerToDate = new Date(this.todayData1.getFullYear(), this.todayData1.getMonth(), this.todayData1.getDate(), 23, 59, 0o0).getTime();
      }

      this.cbSwitchClick("twentyfourhrs");
    }
    else if (value['billing1'] && value['billing2']) {
     
     
      this.startdate = new Date(value['billing1']);
      this.todayData1 = new Date(value['billing2']);
      this.dt = new Date(value['billing1']);
      this.MnPickerFromDate = new Date(this.startdate.getFullYear(), this.startdate.getMonth(), this.startdate.getDate(), 0o0, 0o0, 0o0).getTime();

      this.MnPickerToDate = new Date(this.todayData1.getFullYear(), this.todayData1.getMonth(), this.todayData1.getDate(), 23, 59, 59).getTime();


      this.cbSwitchClick("Billing Cycle");

    } else if (value['year']) {
      
      this.dtNow = new Date(value['year']);
      this.YrEndDatePick = this.dtNow.getFullYear();
      this.stdaytoCond = 1; //dtNow.getDate()
      this.stmonth = 0; //dtNow.getMonth()
      this.styear = this.YrEndDatePick;
      this.startDate = new Date(this.styear, this.stmonth, this.stdaytoCond, 0o0, 0o0, 0o0).getTime();
      this.endDate = this.dtNow.getTime();
      this.cbSwitchClick("year");
    }


  }

  ngOnInit() {

    //console.log(this.dt)
   
    this.logindetailsservice.loadAllUserSensors().pipe(first()).subscribe(data => {

     for(let i=0;i<data.length;i++){
      this.responseData1.push(data[i])
     }
      //this.responseData1 = [data[0], data[1], data[2],data[3]];
      //console.log(this.responseData1);

      this.EnergyCostPerUnit = parseFloat(this.responseData1[0][0]['CostPerUnit']);


      this.logindetailsservice.loadTodayEngegyValue(this.responseData1).subscribe(data => {
console.log(data)
        if (data != null) {
          this.todayconsumeng = data['TodayConsumEng'];
          console.log("today")
          console.log(this.todayconsumeng)
          this.TodayEngergyCost = Math.round(this.todayconsumeng * this.EnergyCostPerUnit);

        }
        else {
          this.todayconsumeng = 0;
          this.TodayEngergyCost = 0;
        }


        this.logindetailsservice.yesterDayUnitsMnyFun(this.responseData1).subscribe(data => {
         console.log("yesterday")
          console.log(data)
          this.yesterdaydata=data;
         if(this.yesterdaydata.length != 0){
          var firstNode = data[0].first;
          var lastNode = data[0].last;

          var dtHist = new Date(firstNode.startTime * 1000);

          var EnergyValEn = (Math.abs(parseFloat(lastNode["endValue"]) - parseFloat(firstNode["startvalue"])));



          var EnergyVal = parseFloat(EnergyValEn.toFixed(1));

          this.EnergyValInrFmt = Math.round(EnergyVal);
          this.EnergyValInrFmtCost = this.EnergyValInrFmt * this.EnergyCostPerUnit;
          this.dayenergyvaluepercentage = ((this.EnergyValInrFmt - this.todayconsumeng) / this.EnergyValInrFmt) * 100;
          this.dayenergycostpercentage = ((this.EnergyValInrFmtCost - this.TodayEngergyCost) / this.EnergyValInrFmtCost) * 100;



         }
          else{
            this.EnergyValInrFmt=0;
            this.EnergyValInrFmtCost=0;
          }     
         
         this.logindetailsservice.loadEnergyData(this.responseData1).subscribe(data => {

            this.todayDateDis = data[0].liveudt * 1000;
            var EnergyData1 = [];
            var lstmnthsEnergyColumnChart = [];



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
            this.TotalMonthsConsumCost = Math.round(this.TotalMonthsConsumUpto * this.EnergyCostPerUnit);
            this.logindetailsservice.lastMonthConsUnitsVsMny(this.responseData1).subscribe(data => {

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


            }

            )

            this.sitename = this.logindetailsservice.sendsitename();
            if (this.sitename != undefined) {
              this.SiteName = this.sitename;
              localStorage.setItem('sitename', this.SiteName);
            }
            else {
              this.SiteName = localStorage.getItem('sitename');
            }

            this.cbSwitchClick(this.statustype);
          })

        })
      })
    })
  }


  cbSwitchClick(type) {
    this.sitename = this.logindetailsservice.sendsitename();
    this.statustype = type
    if (this.statustype == 'twentyfourhrs') {
      this.day = true;
      this.billing = false;
      this.year = false;
     


      this.logindetailsservice.loadtwentyfourhrsEnergyData(this.responseData1, this.PickerFromDate, this.PickerToDate, "true").subscribe(data => {
        this.response = data;
        console.log(this.response)
        var EnergyData1 = [];
        var lstmnthsEnergyColumnChart = [];
        var total24HrsDatatable = [];
        var TotaltwentyfourhrsEnergy = 0;
         

        for (let ee = 0; ee < this.response.length-1; ee++) {

          var dtHist = new Date(this.response[ee].endTime * 1000);
          var EnergyValEn = this.response[ee].hourdifference;

          if (true) {
           
            var EnergyVal = Math.round(EnergyValEn);
            total24HrsDatatable.push(EnergyVal)
            var d = Date.UTC(dtHist.getFullYear(), dtHist.getMonth(), dtHist.getDate(), dtHist.getHours(), dtHist.getMinutes(), dtHist.getSeconds());
            var dd = dtHist.getHours();
            if (dd > 9) {
              if (ee != this.response.length - 1) {
                EnergyData1.push(dd + ".00");
              } else {
                if(dtHist.getMinutes()>9){
                  let hrmin = dtHist.getHours() + ":" + dtHist.getMinutes();
                  EnergyData1.push(hrmin);
                }else{
                  let hrmin = dtHist.getHours() + ":0" + dtHist.getMinutes();
                  EnergyData1.push(hrmin);
                }
               
              }

            } else {
              if (ee != this.response.length - 1) {
                EnergyData1.push("0" + dd + ".00");
              }
              else {
                if(dtHist.getMinutes()>9){
                  let hrmin = dtHist.getHours() + ":" + dtHist.getMinutes();
                  EnergyData1.push(hrmin);
                }else{
                  let hrmin = dtHist.getHours() + ":0" + dtHist.getMinutes();
                  EnergyData1.push(hrmin);
                }
              }

            }
            var totalCost = Math.round(EnergyVal * this.EnergyCostPerUnit);


            if (EnergyVal) {

              TotaltwentyfourhrsEnergy = TotaltwentyfourhrsEnergy + EnergyVal;
              this.TotaltwentyfourhrsEnergy = TotaltwentyfourhrsEnergy;
            }

          }

        }
        //console.log(EnergyData1)
        if (this.chart) {
          this.chart.destroy();
        }

        if(this.response == 0){

        }else{
        this.chart = new Chart('ctx1', {
          type: 'bar',
          data: {
            labels: EnergyData1,
            datasets: [{
              label: 'kWh',
              data: total24HrsDatatable,
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
      })








    }

    else if (this.statustype == 'Billing Cycle') {
      this.day = false;
      this.billing = true;
      this.year = false;
      
      var stdaytoCond = 1;
      this.logindetailsservice.loadEnergyMonthData(this.responseData1, this.MnPickerFromDate, this.MnPickerToDate).subscribe(data => {
        this.response = data;
        //console.log("billing");
        //console.log(this.response);
        if (this.response.length > 0) {
          //$scope.todayDateDis=response[0].liveudt*1000;
          var EnergyData = [];
          var lstEnergyColumnChart = [];
          var totalMonthsDatatable = [];
          var monthsDayArr = [];
          var energyArr = [];
          var TotalMonthsEnergy = 0;
          //var e1=NodeID+"_e1";
          // $scope.ShowMainDashboardLoad = false;
          for (let ee in this.response) {
            var firstNode = this.response[ee].first;
            var lastNode = this.response[ee].last;
            //var previousNode = lstResData[i-1].node[0]; 1511980214
            var nudtnow = new Date(firstNode.startTime * 1000);
            var EnergyValEn = (Math.abs(parseFloat(lastNode["endValue"]) - parseFloat(firstNode["startvalue"])));



            var EnergyVal = Math.round(EnergyValEn);
            //EnergyData.push([Date.UTC(nudtnow.getFullYear(),nudtnow.getMonth(), nudtnow.getDate(), nudtnow.getHours(), nudtnow.getMinutes(), nudtnow.getSeconds()),EnergyVal]);
            var monthname = nudtnow.getDate();




            var totalCost = Math.round(EnergyVal * this.EnergyCostPerUnit);
            var SqFeetCost = (totalCost / 10000)


            var billigDataObj = {
              month: monthname,
              energy: EnergyVal
            }

            totalMonthsDatatable.push(billigDataObj);

            var sorttotalMonthsDatatable = totalMonthsDatatable.sort((a, b) => {
              if (a.month < b.month)
                return -1;
              if (a.month > b.month)
                return +1;

              return 0;
            }
            );

            if (EnergyVal) {
              TotalMonthsEnergy = TotalMonthsEnergy + EnergyVal;
              this.TotalMonthsEnergy = TotalMonthsEnergy;
            }








          }
          for (let i in sorttotalMonthsDatatable) {
            monthsDayArr.push(sorttotalMonthsDatatable[i]['month'] + "-" + this.monthsArray[nudtnow.getMonth()])
            energyArr.push(sorttotalMonthsDatatable[i]['energy'])

          }

          if (this.chart) {
            this.chart.destroy();
          }
  
 
         
          this.chart = new Chart('ctx1', {
            type: 'bar',
            data: {
              labels: monthsDayArr,
              datasets: [{
                label: 'kWh',
                data: energyArr,
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
      })
    } else if (this.statustype == 'Year') {
      this.day = false;
      this.billing = false;
      this.year = true;
     

      this.logindetailsservice.loadEnergyByYear(this.responseData1, this.startDate, this.endDate).subscribe(data => {
        this.response = data;
        var EnergyData = [];
        var lstEnergyColumnChart = [];
        var totalYearDatatable = [];
        var TotalYearsEnergy = 0;


        for (let ee in this.response) {
          var firstNode = this.response[ee].first;
          var lastNode = this.response[ee].last;
          //var previousNode = lstResData[i-1].node[0]; 1511980214
          var nudtnow = new Date(firstNode.startTime * 1000);
          var EnergyValEn = Math.round((Math.abs(parseFloat(lastNode["endValue"]) - parseFloat(firstNode["startvalue"]))));
          // totalYearDatatable.push(EnergyValEn);
          var mn = nudtnow.getMonth();
          var yearDataObj = {
            month: mn,
            energy: EnergyValEn
          }
          EnergyData.push(yearDataObj);
          var sorttototalYearDatatable = EnergyData.sort((a, b) => {
            if (a.month < b.month)
              return -1;
            if (a.month > b.month)
              return +1;

            return 0;
          }
          );
          var EnergyVal = Math.round(EnergyValEn);


          var totalCost = Math.round(EnergyVal * this.EnergyCostPerUnit);
          if (EnergyVal) {
            TotalYearsEnergy = TotalYearsEnergy + EnergyVal;
            this.TotalYearsEnergy = TotalYearsEnergy;
          }

        }
        for (let i in sorttototalYearDatatable) {
          lstEnergyColumnChart.push(this.monthsArray[sorttototalYearDatatable[i]['month']])
          totalYearDatatable.push(sorttototalYearDatatable[i]['energy'])

        }
        if (this.chart) {
          this.chart.destroy();
        }

        this.chart = new Chart('ctx1', {
          type: 'bar',
          data: {
            labels: lstEnergyColumnChart,
            datasets: [{
              label: 'kWh',
              data: totalYearDatatable,
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

      })
    }



  }

  back() {
    this.router.navigate(['/mainindex/dashboard']);
  }

}

