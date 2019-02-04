import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BillingService {
  url="http://azure.indriyn.in:9998";
  constructor(private _http:HttpClient) { }


  loadtwentyfourhrsEnergyData(nid,startDate,endDate,flag){
   
    let nodeid;
    console.log("hhhh");
    if (nid != null && nid != undefined) {
      nodeid = nid;
      localStorage.setItem('nodeid', nid);
    }
    else {
      nodeid = localStorage.getItem('nodeid');
    }
  
    var getUrl = this.url+"/GettwentyfourhrsEnergyUnitsNew?FromDate="+startDate+"&toDate="+endDate+"&NodeID="+nodeid+"&flag="+flag;
    return this._http.get(getUrl);
  }
 
  
  loadEnergyMonthData(nid,startDate,endDate){
   
   
    let nodeid;
    if (nid != null && nid != undefined) {
      nodeid = nid;
      localStorage.setItem('nodeid', nid);
    }
    else {
      nodeid = localStorage.getItem('nodeid');
    }
  
    var getUrl = this.url+"/GetTodayEnergyUnitNewDayMonth?FromDate="+startDate+"&toDate="+endDate+"&NodeID="+nodeid;
return this._http.get(getUrl);
  }


  loadEnergyByYear(nid,startDate,endDate){
  
    let nodeid;
    if (nid != null && nid != undefined) {
      nodeid = nid;
      localStorage.setItem('nodeid', nid);
    }
    else {
      nodeid = localStorage.getItem('nodeid');
    }
  
    var getUrl = this.url+"/GetYearsEnergyUnitsNew?FromDate="+startDate+"&toDate="+endDate+"&NodeID="+nodeid;
  return this._http.get(getUrl);
  
  }
}
