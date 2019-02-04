import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { PmserviceService } from '../Services/pmservice.service';
import { Chart } from 'chart.js';
import * as CanvasJS from '../canvasjs.min';

import * as jsPdf from 'jspdf';
import 'jspdf-autotable';
import saveAs from 'file-saver';
import { Router } from '@angular/router'
@Component({
  selector: 'app-secpowercun',
  templateUrl: './secpowercun.component.html',
  styleUrls: ['./secpowercun.component.css']
})
export class SecpowercunComponent implements OnInit {
  valueObj={day:new Date()}
  dateOfCSV = new Date()
  todayDate=new Date().getDate();
  monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  index = 1;
  dwnstatuss = true;
  value = "bold";
  bgcolor = true;
  canvas = false;
  chart;
  type = ""
  statustype = "twentyfourhrs";
  day = true;
  billing = false;
  displaysectionenergycondata;
  sectionname: string;
  result = [];
  udt = [];
  sno = []
  dataPoints = [];
  dataPoints1 = []
  y;
  time;
  date = new Date();
  PickerFromDate;
  PickerToDate;
  Picker
  status1 = true;
  status2 = false;
  response: any;
  responseForCSVFile = [];
  dtNow = new Date();
  startDate = new Date(this.dtNow.getFullYear(), this.dtNow.getMonth(), this.dtNow.getDate(), 0o0, 0o0, 0o0).getTime();
  endDate = new Date(this.dtNow.getFullYear(), this.dtNow.getMonth(), this.dtNow.getDate(), this.dtNow.getHours(), this.dtNow.getMinutes(), this.dtNow.getSeconds()).getTime();
  Today = "Today";
  constructor(private matdailogref: MatDialogRef<SecpowercunComponent>,
    private pmserviceservice: PmserviceService,
    private router: Router) { }

  ngOnInit() {
    this.pmserviceservice.displaySectionEnergyCon(this.startDate, this.endDate).subscribe(data => {
      this.response = data;
     
      if (this.status1 == true) {
        this.status1 = true;
        this.status2 = false;
        for (let i = 0; i < this.response.length; i++) {
          
          this.result.push(parseFloat(data[i]['result']).toFixed(2))
          this.y = parseFloat(data[i]['result']);
          var min = new Date(data[i]['udt'] * 1000);

          var dataForCSV = parseFloat(data[i]['result']).toFixed(2);
          let hr = new Date(data[i]['udt'] * 1000).getHours()
          let min1 = new Date(data[i]['udt'] * 1000).getMinutes()
          let timeForCSV;
          if (hr > 9 && min1 > 9) {

            timeForCSV = hr + ":" + min1
          } else if (hr < 9) {
            if (min1 > 9)
              timeForCSV = "0" + hr + ":" + min1
            else
              timeForCSV = "0" + hr + ":0" + min1
          } else if (min1 <= 9) {
            if (hr <= 9)
              timeForCSV = "0" + hr + ":0" + min1
            else
              timeForCSV = hr + ":0" + min1
          }
          else {
            timeForCSV = "0" + hr + ":" + min1
          }

          this.result.push(this.y)
          this.udt.push(min)
          let jsonRes = { "Time": timeForCSV, "Value": dataForCSV }
          this.responseForCSVFile.push(jsonRes);
          this.sno.push(i)
          this.dataPoints.push({
            x: min,
            y: this.y
          });
        }

      }
      this.dwnstatuss = false;
      this.status1 = false;
      this.status2 = true;
      this.cbSwitchClick(this.statustype,this.dateOfCSV)

    })
 
    this.sectionname = this.pmserviceservice.sectionName()

  }

  dateWise(value) {
   
    this.dateOfCSV = new Date(value['day']);
    if(new Date(value['day']) == new Date()){
      this.valueObj={day:new Date(value['day'])}
      
    }else{

      this.valueObj={day:new Date()}
    }
   
    this.canvas = true;
    if (this.dataPoints1 != []) {
      this.dataPoints1 = [];
    }
    let date1 = new Date(value['day']).getDate();
    let date2 = new Date().getDate();
    if (date1 == date2) {
      this.value = "bold";
      this.date = new Date();
      let dt = new Date();
      this.PickerFromDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 0o0, 0o0, 0o0).getTime();
      if (this.date.getFullYear() == dt.getFullYear() && this.date.getMonth() == dt.getMonth() && this.date.getDate() == dt.getDate()) {
        this.PickerToDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), this.date.getHours(), this.date.getMinutes(), this.date.getSeconds()).getTime();
      }
    } else {
      this.value = "value";
      this.date = new Date(value['day']);
      let dt = new Date(value['day']);
      this.PickerFromDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 0o0, 0o0, 0o0).getTime();
      if (this.date.getFullYear() == dt.getFullYear() && this.date.getMonth() == dt.getMonth() && this.date.getDate() == dt.getDate()) {
        this.PickerToDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 23, 59, 0o0).getTime();
      }
    }

    this.bgcolor = false;
    if (value['day']) {
      
      this.pmserviceservice.displaySectionEnergyCon(this.PickerFromDate, this.PickerToDate).subscribe(data => {
        this.response = data;
       
        if (this.status1 == false) {
          this.status1 = true;
          this.status2 = false;
          this.responseForCSVFile = [];
          for (let i = 0; i < this.response.length; i++) {
            this.result.push(parseFloat(data[i]['result']).toFixed(2))
            this.y = parseFloat(data[i]['result']);
            var min = new Date(data[i]['udt'] * 1000);
            this.time = min;
            //var hr = new Date(data[i]['udt'] * 1000).getHours();
            var dataForCSV = parseFloat(data[i]['result']).toFixed(2);
            let hr = new Date(data[i]['udt'] * 1000).getHours()
            let min1 = new Date(data[i]['udt'] * 1000).getMinutes()
            let timeForCSV;
            if (hr > 9 && min1 > 9) {

              timeForCSV = hr + ":" + min1
            } else if (hr < 9) {
              if (min1 > 9)
                timeForCSV = "0" + hr + ":" + min1
              else
                timeForCSV = "0" + hr + ":0" + min1
            } else if (min1 <= 9) {
              if (hr <= 9)
                timeForCSV = "0" + hr + ":0" + min1
              else
                timeForCSV = hr + ":0" + min1
            }
            else {
              timeForCSV = "0" + hr + ":" + min1
            }

            this.result.push(this.y)
            this.udt.push(min)
            let jsonRes = { "Time": timeForCSV, "Value": dataForCSV }
            this.responseForCSVFile.push(jsonRes);



            this.dataPoints1.push({

              x: min,
              y: this.y
            });

          }

        }
        this.status1 = false;
        this.status2 = true;

        this.cbSwitchClick(this.statustype,this.dateOfCSV)

      })
    }

  }
  cbSwitchClick(type,date) {
    this.bgcolor = false;

  
       
    
   
    if (type == "twentyfourhrs") {
      this.day = true;
      this.billing = false;
       let x=date.getDate()
       let y=this.dateOfCSV.getDate()
      if( x != y){
       
        this.dateWise(this.valueObj)
       }
     
      if (this.canvas == false) {
        this.chart = new CanvasJS.Chart("chartContainer", {
          zoomEnabled: true,
          animationEnabled: true,
          exportEnabled: true,
          axisX: {
            title: "Time",

            interval: 60,
            intervalType: "minute",
            valueFormatString: "HH:mm"

          },
          axisY: {
            title: "Power(Kw)",
          },
          toolTip: {
            contentFormatter: function (e) {
              var hr = e.entries[0].dataPoint.x.getHours();
              var min = e.entries[0].dataPoint.x.getMinutes();
              if (hr > 9 && min > 9) {

                return e.entries[0].dataPoint.x.getHours() + ":" + e.entries[0].dataPoint.x.getMinutes() + ":" + " " + parseFloat(e.entries[0].dataPoint.y).toFixed(2) + "Kw";
              } else if (hr < 9) {
                if (min > 9)
                  return "0" + e.entries[0].dataPoint.x.getHours() + ":" + e.entries[0].dataPoint.x.getMinutes() + ":" + " " + parseFloat(e.entries[0].dataPoint.y).toFixed(2) + "Kw";
                else
                  return "0" + e.entries[0].dataPoint.x.getHours() + ":0" + e.entries[0].dataPoint.x.getMinutes() + ":" + " " + parseFloat(e.entries[0].dataPoint.y).toFixed(2) + "Kw";
              } else if (min <= 9) {
                if (hr <= 9)
                  return "0" + e.entries[0].dataPoint.x.getHours() + ":0" + e.entries[0].dataPoint.x.getMinutes() + ":" + " " + parseFloat(e.entries[0].dataPoint.y).toFixed(2) + "Kw";
                else
                  return e.entries[0].dataPoint.x.getHours() + ":0" + e.entries[0].dataPoint.x.getMinutes() + ":" + " " + parseFloat(e.entries[0].dataPoint.y).toFixed(2) + "Kw";
              }
              else {
                return "0" + e.entries[0].dataPoint.x.getHours() + ":" + e.entries[0].dataPoint.x.getMinutes() + ":" + " " + parseFloat(e.entries[0].dataPoint.y).toFixed(2) + "Kw";
              }
            }
          },
          data: [
            {
              type: "line",
              dataPoints: this.dataPoints
            }]
        });

        this.chart.render();
      } else {
        this.chart = new CanvasJS.Chart("chartContainer", {
          zoomEnabled: true,
          animationEnabled: true,
          exportEnabled: true,
          axisX: {
            title: "Time",

            interval: 60,
            intervalType: "minute",
            valueFormatString: "HH:mm"

          },
          axisY: {
            title: "Power(Kw)",
          },
          toolTip: {
            contentFormatter: function (e) {
              var hr = e.entries[0].dataPoint.x.getHours();
              var min = e.entries[0].dataPoint.x.getMinutes();
              if (hr > 9 && min > 9) {

                return e.entries[0].dataPoint.x.getHours() + ":" + e.entries[0].dataPoint.x.getMinutes() + ":" + " " + parseFloat(e.entries[0].dataPoint.y).toFixed(2) + "Kw";
              } else if (hr < 9) {
                if (min > 9)
                  return "0" + e.entries[0].dataPoint.x.getHours() + ":" + e.entries[0].dataPoint.x.getMinutes() + ":" + " " + parseFloat(e.entries[0].dataPoint.y).toFixed(2) + "Kw";
                else
                  return "0" + e.entries[0].dataPoint.x.getHours() + ":0" + e.entries[0].dataPoint.x.getMinutes() + ":" + " " + parseFloat(e.entries[0].dataPoint.y).toFixed(2) + "Kw";
              } else if (min <= 9) {
                if (hr <= 9)
                  return "0" + e.entries[0].dataPoint.x.getHours() + ":0" + e.entries[0].dataPoint.x.getMinutes() + ":" + " " + parseFloat(e.entries[0].dataPoint.y).toFixed(2) + "Kw";
                else
                  return e.entries[0].dataPoint.x.getHours() + ":0" + e.entries[0].dataPoint.x.getMinutes() + ":" + " " + parseFloat(e.entries[0].dataPoint.y).toFixed(2) + "Kw";
              }
              else {
                return "0" + e.entries[0].dataPoint.x.getHours() + ":" + e.entries[0].dataPoint.x.getMinutes() + ":" + " " + parseFloat(e.entries[0].dataPoint.y).toFixed(2) + "Kw";
              }
            }
          },
          data: [
            {
              type: "line",
              dataPoints: this.dataPoints1
            }]
        });

        this.chart.render();
      }
    }
    else if (type == "Billing Cycle") {
      this.bgcolor = true;
    }

  }

  convert() {

    var doc = new jsPdf();
    var col = ["S.No.", "Time", "Value"];
    var rows = [];




    this.response.forEach(element => {
      let index = 1;
      let hr = new Date(element['udt'] * 1000).getHours()
      let min = new Date(element['udt'] * 1000).getMinutes()
      let udt;
      if (hr > 9 && min > 9) {

        udt = hr + ":" + min
      } else if (hr < 9) {
        if (min > 9)
          udt = "0" + hr + ":" + min
        else
          udt = "0" + hr + ":0" + min
      } else if (min <= 9) {
        if (hr <= 9)
          udt = "0" + hr + ":0" + min
        else
          udt = hr + ":0" + min
      }
      else {
        udt = "0" + hr + ":" + min
      }
      let result = parseFloat(element.result).toFixed(2);
      var temp = [this.index, udt, result];
      rows.push(temp);
      if (udt) {
        this.index = this.index + 1;
      }


    });
    this.index = 1;
    doc.text("SectinName:" + this.sectionname, 50, 20);
    doc.text("Data:" + this.monthsArray[this.dateOfCSV.getMonth()] + "-" + this.dateOfCSV.getDate() + "-" + this.dateOfCSV.getFullYear() + " " + "00:00" + " to " + this.monthsArray[this.dateOfCSV.getMonth()] + "-" + this.dateOfCSV.getDate() + "-" + this.dateOfCSV.getFullYear() + " " + this.dateOfCSV.getHours() + ":" + this.dateOfCSV.getMinutes(), 50, 30);
    doc.autoTable(col, rows, {


      margin: { top: 40 },
      theme: 'grid',

    });

    doc.save(this.sectionname + "(" + this.monthsArray[this.dateOfCSV.getMonth()] + "-" + this.dateOfCSV.getDate() + "-" + this.dateOfCSV.getFullYear() + ")" + ".pdf");
  }

  downloadFile() {
  
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(this.response[0]);
    let csv = this.response.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], { type: 'text/csv' })
    saveAs(blob, this.sectionname + "(" + this.monthsArray[this.dateOfCSV.getMonth()] + "-" + this.dateOfCSV.getDate() + "-" + this.dateOfCSV.getFullYear() + ")" + ".csv");
  }
  onClose() {
    this.matdailogref.close()
  }
}

//