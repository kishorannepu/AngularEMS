import { Component, OnInit } from '@angular/core';

import { PmserviceService } from '../Services/pmservice.service';
import { BillingService } from '../Services/billing.service';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  date1 = new Date();
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
  sectiondata = []; sectioncal = [];
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
  hourswithdecimal = [];
  imgUrl;
  SiteName;
  // ==================================================================
  status1; status2
  x; chart: any;
  todayDateDis;
  statustype = "twentyfourhrs";
  title = 'Bar Chart Example in Angular 4';
  nodeid1;
  nodeid2;
  nodeid3;
  responseData1;
  day: boolean;
  billing: boolean;
  year: boolean;
  sitename;
  todayconsumeng;

  click = true;
  //swithstatus =true;
  TotaltwentyfourhrsEnergy = 0;
  TotalMonthsEnergy = 0;
  TotalYearsEnergy = 0;

  // ADD CHART OPTIONS.


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
  
  endDate = this.dtNow.getTime();



  //======================================================================
  constructor(private logindetailsservice: BillingService,
    private pmserviceservice: PmserviceService) { }

  dateWise(value) {
    

    if (value['day']) {
      this.status1 = false;
      this.status2 = true;
      this.todayData1 = new Date(value['day']);
      this.dt = new Date(value['day']);
      this.PickerFromDate = new Date(this.todayData1.getFullYear(), this.todayData1.getMonth(), this.todayData1.getDate(), 0o0, 0o0, 0o0).getTime();
      if (this.todayData1.getFullYear() == this.dt.getFullYear() && this.todayData1.getMonth() == this.dt.getMonth() && this.todayData1.getDate() == this.dt.getDate()) {
        this.PickerToDate = new Date(this.todayData1.getFullYear(), this.todayData1.getMonth(), this.todayData1.getDate(), 23, 59, 0o0).getTime();
      }

      this.cbSwitchClick("twentyfourhrs");
    }
    else if (value['billing1'] && value['billing2']) {
      this.status1 = false;
      this.status2 = true;
      this.startdate = new Date(value['billing1']);
      this.todayData1 = new Date(value['billing2']);
      this.dt = new Date(value['billing1']);
      this.MnPickerFromDate = new Date(this.startdate.getFullYear(), this.startdate.getMonth(), this.startdate.getDate(), 0o0, 0o0, 0o0).getTime();

      this.MnPickerToDate = new Date(this.todayData1.getFullYear(), this.todayData1.getMonth(), this.todayData1.getDate(), 23, 59, 59).getTime();


      this.cbSwitchClick("Billing Cycle");

    } else if (value['year']) {
      this.status1 = false;
      this.status2 = true;
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
    this.cbSwitchClick(this.statustype);
    this.breakpoint = (window.innerWidth <= 480) ? 1 : 3;
    this.pmserviceservice.LoadSites().subscribe(data => {
      this.response = data;
      this.imgUrl = this.response[0]['SiteImgUrl'];
      this.SiteName = this.response[0]['SiteName'];
     
      this.pmserviceservice.LoadSitesCorsData(this.response).subscribe(data => {
        this.userresponse = data;

        this.nodeid = this.userresponse[0].SensLiveData.node[0].nid;
       
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



          if (data != null) {
            this.TodayEngergyvalue = data['TodayConsumEng'].toFixed(1);
            this.TodayEngergyCost = Math.round(this.TodayEngergyvalue * this.EnergyCostPerUnit);
          }
          else {
            this.TodayEngergyvalue = "--";
            this.TodayEngergyCost = "--";
          }

          this.pmserviceservice.firstDivUnitsFunc(this.TodayEngergyvalue, this.nodeid).subscribe(data => {


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


            this.pmserviceservice.yesterDayUnitsMnyFun(this.nodeid).subscribe(data => {


              var firstNode = data[0].first;
              var lastNode = data[0].last;

              var dtHist = new Date(firstNode.startTime * 1000);

              var EnergyValEn = (Math.abs(parseFloat(lastNode["endValue"]) - parseFloat(firstNode["startvalue"])));



              var EnergyVal = parseFloat(EnergyValEn.toFixed(1));

              this.EnergyValInrFmt = Math.round(EnergyVal);
              this.EnergyValInrFmtCost = this.EnergyValInrFmt * this.EnergyCostPerUnit;
              this.dayenergyvaluepercentage = ((this.EnergyValInrFmt - this.TodayEngergyvalue) / this.EnergyValInrFmt) * 100;
              this.dayenergycostpercentage = ((this.EnergyValInrFmtCost - this.TodayEngergyCost) / this.EnergyValInrFmtCost) * 100;

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


  cbSwitchClick(type) {
    //this.sitename = this.logindetailsservice.sendsitename();
    this.click = false;
    this.statustype = type
    if (this.statustype == 'twentyfourhrs') {
      this.day = true;
      this.billing = false;
      this.year = false;
      this.status1 = false;
      this.status2 = true;


      this.logindetailsservice.loadtwentyfourhrsEnergyData(this.nodeid, this.PickerFromDate, this.PickerToDate, "true").subscribe(data => {
        this.response = data;
       
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
       
        if (this.chart) {
          this.chart.destroy();
        }
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

      })








    }

    else if (this.statustype == 'Billing Cycle') {
      this.day = false;
      this.billing = true;
      this.year = false;
      this.status1 = false;
      this.status2 = true;
      var stdaytoCond = 1;
      this.logindetailsservice.loadEnergyMonthData(this.nodeid, this.MnPickerFromDate, this.MnPickerToDate).subscribe(data => {
        this.response = data;
       
        if (this.response.length > 0) {
        
          var EnergyData = [];
          var lstEnergyColumnChart = [];
          var totalMonthsDatatable = [];
          var monthsDayArr = [];
          var energyArr = [];
          var TotalMonthsEnergy = 0;
        
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
      this.status1 = false;
      this.status2 = true;

      this.logindetailsservice.loadEnergyByYear(this.nodeid, this.startDate, this.endDate).subscribe(data => {
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



}
