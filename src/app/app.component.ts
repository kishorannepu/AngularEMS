import { Component,ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FMS-Ang6';

  numbers=[]
  chart;


  ngOnInit() {
    for (let index = 0; index < 10000; index++) {
      this.numbers.push(index);
    }

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['2001','2002','2001','2002','2001','2003','2004'],
        datasets: [
          { 
            data: [21,23,24,35,12,34,22],
            borderColor: "#3cba9f",
            fill: false
          },
          
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }
}
