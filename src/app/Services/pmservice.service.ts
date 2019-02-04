import { Injectable } from '@angular/core';
import { HttpClient ,HttpErrorResponse} from '@angular/common/http';
import { Observable ,throwError} from "rxjs";
import {catchError,retry} from "rxjs/internal/operators";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class PmserviceService {
  url="http://azure.indriyn.in:9998";
  sendpmlogindata;
  EnterpriseName;
  EnterpriseCode;
  SectionId;SiteId;
  token;
  loadsitedata;
  UserCode;
  sectionenergyconsuption;
  SectionName;

 
  constructor(private _http: HttpClient) {
  
   }

  getPMDetails(pmlogindata) {
    this.sendpmlogindata = pmlogindata;
    this.EnterpriseName = this.sendpmlogindata['userObj'].EnterpriseName;
    this.EnterpriseCode = this.sendpmlogindata['userObj'].EnterpriseCode;
    this.UserCode = this.sendpmlogindata['userObj'].UserCode;
    console.log("UserCode")
    console.log(this.UserCode)
    this.token = this.sendpmlogindata.token;
  }
  sendLoginUserData() {
    return this.sendpmlogindata;
  }

  LoadSites():Observable<any> {
    let UserCode, EnterpriseCode;
    if (this.sendpmlogindata != null && this.sendpmlogindata != undefined) {
      UserCode = this.UserCode;
      EnterpriseCode = this.EnterpriseCode;

      localStorage.setItem('UserCode', this.UserCode);
      localStorage.setItem('EnterpriseCode', this.EnterpriseCode);
    }
    else {
      UserCode = localStorage.getItem('UserCode');
      EnterpriseCode = localStorage.getItem('EnterpriseCode');
    }
    return this._http.get(`${this.url}/GetAllSitesByUsersMap?EntCode=${EnterpriseCode}&UserCode=${UserCode}`)
                     .pipe(
                       retry(3),
                       catchError(this.handleError)
                     );
                     
  }


  LoadSitesCorsData(data):Observable<any> {
    let EnterpriseCode;
    if (this.sendpmlogindata != null && this.sendpmlogindata != undefined) {
      EnterpriseCode = this.EnterpriseCode;
      localStorage.setItem('EnterpriseCode', this.EnterpriseCode);
    }
    else {
      EnterpriseCode = localStorage.getItem('EnterpriseCode');
    }
    return this._http.get(`${this.url}/GetSitesSenosrsLiveData?EntCode=${EnterpriseCode}&SiteId=${data[0].SiteId}`)
  
  
  }

  loadEnergyCost(data):Observable<any> {
    let EnterpriseCode;
    if (this.sendpmlogindata != null && this.sendpmlogindata != undefined) {
      EnterpriseCode = this.EnterpriseCode;
      localStorage.setItem('EnterpriseCode', this.EnterpriseCode);
    }
    else {
      EnterpriseCode = localStorage.getItem('EnterpriseCode');
    }
    return this._http.get(`${this.url}/GetNodemacIdBySiteId?EntCode=${EnterpriseCode}&SiteId=${data[0].SiteId}`)
  }

  loadTodayEngegyValue(nid):Observable<any>{
    let nodeid;
    if (nid != null && nid != undefined) {
      nodeid = nid;
      localStorage.setItem('nodeid', nid);
    }
    else {
      nodeid = localStorage.getItem('nodeid');
    }
    let dtNow = new Date();
    
    let firstDay = new Date(dtNow.getFullYear(), dtNow.getMonth(),dtNow.getDate(),0o0,0o0,0o0).getTime();
  
    let endDate = new Date().getTime(); 
    
     var getUrl =this.url+"/GetTodayEngLiveNew?FromDate="+firstDay+"&toDate="+endDate+"&NodeID="+nodeid;
 
     return this._http.get(getUrl);
  }

  firstDivUnitsFunc(todayengergyvalue,nid):Observable<any>{
    let nodeid;
    if (nid != null && nid != undefined) {
      nodeid = nid;
      localStorage.setItem('nodeid', nid);
    }
    else {
      nodeid = localStorage.getItem('nodeid');
    }
   
   
    var dtNow = new Date();
    var startDate = new Date(dtNow.getFullYear(),dtNow.getMonth(),0o1,0o0,0o0,0o0).getTime();
    var endDate = new Date().getTime(); 
     
    var getUrl=this.url+"/GetTodayEnergyUnitNewDayMonth?FromDate="+startDate+"&toDate="+endDate+"&NodeID="+nodeid;
  return this._http.get(getUrl);
  }

  yesterDayUnitsMnyFun(nid):Observable<any>{
    let nodeid;
    if (nid != null && nid != undefined) {
      nodeid = nid;
      localStorage.setItem('nodeid', nid);
    }
    else {
      nodeid = localStorage.getItem('nodeid');
    }


     var dtNow = new Date();
			var startDate = new Date(dtNow.getFullYear(),dtNow.getMonth(),dtNow.getDate()-1,0o0,0o0,0o0).getTime();
			var endDate = new Date(dtNow.getFullYear(),dtNow.getMonth(),dtNow.getDate()-1,dtNow.getHours(),dtNow.getMinutes(),dtNow.getSeconds()).getTime(); 
		
			
      var getUrl =this.url+"/GetTodayEnergyUnitNew?FromDate="+startDate+"&toDate="+endDate+"&NodeID="+nodeid;
      
      return this._http.get(getUrl);
  }

  lastMonthConsUnitsVsMny(nid):Observable<any>{
    let nodeid;
    if (nid != null && nid != undefined) {
      nodeid = nid;
      localStorage.setItem('nodeid', nid);
    }
    else {
      nodeid = localStorage.getItem('nodeid');
    }

    var dtNow = new Date();
		var dayscount=32 -new Date(dtNow.getFullYear(), dtNow.getMonth()-1, 32).getDate();
    var startDate = new Date(dtNow.getFullYear(),dtNow.getMonth()-1,0o1,0o0,0o0,0o0).getTime();
		var endDate = new Date(dtNow.getFullYear(),dtNow.getMonth()-1,dtNow.getDate(),23,59,59).getTime(); 
		
		
		var getUrl1 =this.url+"/GetTodayEnergyUnitNew?FromDate="+startDate+"&toDate="+endDate+"&NodeID="+nodeid;

		return this._http.get(getUrl1);
			
			
				
  }
sectionsData(res):Observable<any>{
  let EnterpriseCode;
  if (this.sendpmlogindata != null && this.sendpmlogindata != undefined) {
    EnterpriseCode = this.EnterpriseCode;
    localStorage.setItem('EnterpriseCode', this.EnterpriseCode);
  }
  else {
    EnterpriseCode = localStorage.getItem('EnterpriseCode');
  }
  var dtNow = new Date();
			var startDate = new Date(dtNow.getFullYear(),dtNow.getMonth(),dtNow.getDate(),0o0,0o0,0o0).getTime();
			var endDate = new Date(dtNow.getFullYear(),dtNow.getMonth(),dtNow.getDate(),dtNow.getHours(),dtNow.getMinutes(),dtNow.getSeconds()).getTime(); 
  var getUrl =this.url+"/GetSectionsBySiteIdForPM?EntCode="+EnterpriseCode+"&SiteId="+res[0].SiteId+"&StartDate="+startDate+"&EndDate="+endDate;

return this._http.get(getUrl);
}

sectionEnergyCon(sctionid,siteid,entcode,SectionName){
  
  this.SectionId=sctionid;
  this.SiteId=siteid;
  this.EnterpriseCode=entcode;
 this.SectionName=SectionName;

}
// dateWisePowerCon(sd,ed){
//  // this.startDate=sd;
//  // this.endDate=ed;
//   // return this._http.get(`http://azure.indriyn.in:9998/GetSectionsLineChartApi?SectionId=${this.SectionId}&SiteId=${this.SiteId}&EnterpriseCode=${this.EnterpriseCode}&FromDate=${this.startDate}&ToDate=${this.endDate}`);
// }
displaySectionEnergyCon(startDate,endDate){
 
  return this._http.get(`http://azure.indriyn.in:9998/GetSectionsLineChartApi?SectionId=${this.SectionId}&SiteId=${this.SiteId}&EnterpriseCode=${this.EnterpriseCode}&FromDate=${startDate}&ToDate=${endDate}`);
}
sectionName(){
  return this.SectionName;
}
cyclesPerMon(sctionid,siteid,entcode,SectionName){
  this.SectionId=sctionid;
  this.SiteId=siteid;
  this.EnterpriseCode=entcode;
  this.SectionName=SectionName;
}

displayCyclesPerMon(){
  var dtNow = new Date();
  var startDate = new Date(dtNow.getFullYear(),dtNow.getMonth(),0o1,0o0,0o0,0o0).getTime();
  console.log(startDate)
  var endDate = new Date(dtNow.getFullYear(),dtNow.getMonth(),dtNow.getDate(),dtNow.getHours(),dtNow.getMinutes(),dtNow.getSeconds()).getTime(); 
  return this._http.get(`http://azure.indriyn.in:9998/GetcyclesinDateRange?SectionID=${this.SectionId}&SiteId=${this.SiteId}&EntCode=${this.EnterpriseCode}&StartDate=${startDate}&EndDate=${endDate}`);
}
// error handling

private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(error.status);
};
}



