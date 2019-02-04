import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogindetailsService {
  url = "http://azure.indriyn.in:9998";
  sendlogindata;
  EnterpriseName;
  EnterpriseCode;
  siteid;
  token;
  EMSDashboard = [];
  res1=[]; res2; res3;res4; NodemacIdres1; NodemacIdres2; NodemacIdres3;
  NodemacIdres4;
  getUrl;
  nodeMacIndex;
  nodemacid = [];
  sitename;
  constructor(private _http: HttpClient) { }
  getLoginDetails(logindata) {
    this.sendlogindata = logindata;
    this.EnterpriseName = this.sendlogindata['userObj'].EnterpriseName;
    this.EnterpriseCode = this.sendlogindata['userObj'].EnterpriseCode;
    this.token = this.sendlogindata.token;
  }
  sendLoginData() {
    let getToken, EnterpriseCode
    if (this.sendlogindata != null && this.sendlogindata != undefined) {
      getToken = this.sendlogindata.token;
      EnterpriseCode = this.EnterpriseCode;

      localStorage.setItem('token', this.sendlogindata.token);
      localStorage.setItem('EnterpriseCode', this.EnterpriseCode);

    }
    else {
      getToken = localStorage.getItem('token');
      EnterpriseCode = localStorage.getItem('EnterpriseCode');

    }

    return this._http.get<any>(`${this.url}/api/GetAllSitesForTileview?EntCode=${EnterpriseCode}&token=${getToken}`);

  }

  EMSDashboardSensCalinit(data) {

    this.siteid = data;
    console.log("[0]['SiteId']")
    console.log(data)
   for(let i=0;i<data.length;i++){
    this.res1.push(this._http.get(`${this.url}/GetEMSDashboardSensCal?EntCode=${this.EnterpriseCode}&SiteId=${data[i].SiteId}`));
    }
   return forkJoin(this.res1);
  // this.res1 = this._http.get(`${this.url}/GetEMSDashboardSensCal?EntCode=${this.EnterpriseCode}&SiteId=${data[0].SiteId}`);
  //   this.res2 = this._http.get(`${this.url}/GetEMSDashboardSensCal?EntCode=${this.EnterpriseCode}&SiteId=${data[1].SiteId}`);
  //   this.res3 = this._http.get(`${this.url}/GetEMSDashboardSensCal?EntCode=${this.EnterpriseCode}&SiteId=${data[2].SiteId}`);
  //   this.res4 = this._http.get(`${this.url}/GetEMSDashboardSensCal?EntCode=${this.EnterpriseCode}&SiteId=${data[3].SiteId}`);
    
  }

  sendLoginUserData() {
    return this.sendlogindata;
  }

  loadAllUserSensors() {
    let siteid, EnterpriseCode
    if (this.sendlogindata != null && this.sendlogindata != undefined) {
      
      EnterpriseCode = this.EnterpriseCode;
    
      localStorage.setItem('EnterpriseCode', this.EnterpriseCode);
     
     

    }
    else {

      EnterpriseCode = localStorage.getItem('EnterpriseCode');
      
      
    }
    
     this.NodemacIdres1 = this._http.get(`${this.url}/GetNodemacIdBySiteId?EntCode=${EnterpriseCode}&SiteId=SM1`);
     this.NodemacIdres2 = this._http.get(`${this.url}/GetNodemacIdBySiteId?EntCode=${EnterpriseCode}&SiteId=SM7`);
     this.NodemacIdres3 = this._http.get(`${this.url}/GetNodemacIdBySiteId?EntCode=${EnterpriseCode}&SiteId=SM8`);
    this.NodemacIdres4 = this._http.get(`${this.url}/GetNodemacIdBySiteId?EntCode=${EnterpriseCode}&SiteId=SM9`);
    return forkJoin([this.NodemacIdres1,this.NodemacIdres2,this.NodemacIdres3,this.NodemacIdres4]);

  }
  nodemacIdindex(index, SiteName) {
    this.nodeMacIndex = index;
    this.sitename = SiteName;
  }
  sendsitename() {
    return this.sitename;
  }
  loadTodayEngegyValue(nid) {
 
    let nodeid;
    let nodemacindex;
    let index
    if (nid != null && nid != undefined) {
      nodeid = nid;
      localStorage.setItem('nodeid', nid);
    }
    else {
      nodeid = localStorage.getItem('nodeid');
    }
    if (this.nodeMacIndex != undefined && this.nodeMacIndex != null) {
      index = this.nodeMacIndex;
      localStorage.setItem('index', this.nodeMacIndex);
      nodemacindex = nodeid[index][0]['NodeMacid'];
      // console.log("1111")
      // console.log(nodemacindex)
      localStorage.setItem('siteid1', nodemacindex);
    } else {
      index = localStorage.getItem('index')
      nodemacindex = localStorage.getItem('siteid1');
      console.log("1111")
      console.log(nodemacindex)
    }
    var dtNow = new Date();
    var startDate = new Date(dtNow.getFullYear(), dtNow.getMonth(), dtNow.getDate(), 0o0, 0o0, 0o0).getTime();//23,59,59
    var endDate = new Date().getTime();

    var getUrl1 = this.url + "/GetTodayEngLiveNew?FromDate=" + startDate + "&toDate=" + endDate + "&NodeID=" + nodemacindex;
    return this._http.get(getUrl1);

  }

  yesterDayUnitsMnyFun(nid) {
    this.nodemacid = nid;
    let nodemacindex;
    let index
    //console.log("yyyyy");
    if (this.nodeMacIndex != undefined && this.nodeMacIndex != null) {
      console.log("222222")
      console.log(this.nodemacid)
      index = this.nodeMacIndex;
      localStorage.setItem('index', index);
      nodemacindex = this.nodemacid[index][0]['NodeMacid'];
      localStorage.setItem('siteid1', nodemacindex);
    } else {
      localStorage.getItem('index')
      nodemacindex = localStorage.getItem('siteid1');
    }


    var dtNow = new Date();
    var startDate = new Date(dtNow.getFullYear(), dtNow.getMonth(), dtNow.getDate() - 1, 0o0, 0o0, 0o0).getTime();
    var endDate = new Date(dtNow.getFullYear(), dtNow.getMonth(), dtNow.getDate() - 1, dtNow.getHours(), dtNow.getMinutes(), dtNow.getSeconds()).getTime();


    var getUrl = this.url + "/GetTodayEnergyUnitNew?FromDate=" + startDate + "&toDate=" + endDate + "&NodeID=" + nodemacindex;

    return this._http.get(getUrl);
  }



  loadEnergyData(nid) {
    this.nodemacid = nid;
    let nodemacindex;
    let index = this.nodeMacIndex;

    if (this.nodeMacIndex != undefined && this.nodeMacIndex != null) {
      index = this.nodeMacIndex;
      localStorage.setItem('index', index);
      nodemacindex = this.nodemacid[index][0]['NodeMacid'];
      localStorage.setItem('siteid1', nodemacindex);
    } else {
      index = localStorage.getItem('index')
      nodemacindex = localStorage.getItem('siteid1');
    }

    var dtNow = new Date();
    var stdaytoCond = 1;
    var stmonth = dtNow.getMonth();
    var styear = dtNow.getFullYear();
    var startDate = new Date(dtNow.getFullYear(), dtNow.getMonth(), 0o1, 0o0, 0o0, 0o0).getTime();
    var endDate = new Date().getTime();
    var getUrl = this.url + "/GetTodayEnergyUnitNewDayMonth?FromDate=" + startDate + "&toDate=" + endDate + "&NodeID=" + nodemacindex;
    return this._http.get(getUrl);
  }

  lastMonthConsUnitsVsMny(nid) {
    this.nodemacid = nid;
    let nodemacindex;
    let index
    if (this.nodeMacIndex != undefined && this.nodeMacIndex != null) {
      
      index = this.nodeMacIndex;
      localStorage.setItem('index', index);
      nodemacindex = this.nodemacid[index][0]['NodeMacid'];
      localStorage.setItem('siteid1', nodemacindex);
    } else {
      index = localStorage.getItem('index')
      nodemacindex = localStorage.getItem('siteid1');
    }

    var dtNow = new Date();
    var dayscount = 32 - new Date(dtNow.getFullYear(), dtNow.getMonth() - 1, 32).getDate();

    var startDate = new Date(dtNow.getFullYear(), dtNow.getMonth() - 1, 0o1, 0o0, 0o0, 0o0).getTime();
    var endDate = new Date(dtNow.getFullYear(), dtNow.getMonth() - 1, dtNow.getDate(), 23, 59, 59).getTime();

    var getUrl1 = this.url + "/GetTodayEnergyUnitNew?FromDate=" + startDate + "&toDate=" + endDate + "&NodeID=" + nodemacindex;

    return this._http.get(getUrl1);



  }

  // loadEnergyDataByNodeID(startDate,endDate,nid){

  //   let nodemacindex;
  //   let index
  //   let nodeid;
  //   if (nid != null && nid != undefined) {
  //     nodeid = nid;
  //     localStorage.setItem('nodeid', nid);
  //   }
  //   else {
  //     nodeid = localStorage.getItem('nodeid');
  //   }
  //  if(this.nodeMacIndex != undefined && this.nodeMacIndex != null){
  //  index=this.nodeMacIndex;
  //  localStorage.setItem('index',index);
  //   nodemacindex=nodeid[index][0]['NodeMacid'];
  //   localStorage.setItem('siteid1',nodemacindex);
  //  }else{
  //    localStorage.getItem('index')
  //   localStorage.getItem('siteid1');
  //  }
  //   var getUrl = this.url+"/GetTodayEnergyUnitNewDayMonth?FromDate="+startDate+"&toDate="+endDate+"&NodeID="+nodemacindex;
  //   return this._http.get(getUrl);
  // }

  loadtwentyfourhrsEnergyData(nid, startDate, endDate, flag) {
    let nodemacindex;
    let index
    let nodeid;
    //console.log("hhhh");
    if (nid != null && nid != undefined) {
      nodeid = nid;
      localStorage.setItem('nodeid', nid);
    }
    else {
      nodeid = localStorage.getItem('nodeid');
    }
    if (this.nodeMacIndex != undefined && this.nodeMacIndex != null) {
      index = this.nodeMacIndex;
      localStorage.setItem('index', index);
      nodemacindex = nodeid[index][0]['NodeMacid'];
      localStorage.setItem('siteid1', nodemacindex);
    } else {
      index = localStorage.getItem('index')
      nodemacindex = localStorage.getItem('siteid1');
    }
    var getUrl = this.url + "/GettwentyfourhrsEnergyUnitsNew?FromDate=" + startDate + "&toDate=" + endDate + "&NodeID=" + nodemacindex + "&flag=" + flag;
    return this._http.get(getUrl);
  }


  loadEnergyMonthData(nid, startDate, endDate) {

    let nodemacindex;
    let index
    let nodeid;
    if (nid != null && nid != undefined) {
      nodeid = nid;
      localStorage.setItem('nodeid', nid);
    }
    else {
      nodeid = localStorage.getItem('nodeid');
    }
    if (this.nodeMacIndex != undefined && this.nodeMacIndex != null) {
      index = this.nodeMacIndex;
      localStorage.setItem('index', index);
      nodemacindex = nodeid[index][0]['NodeMacid'];
      localStorage.setItem('siteid1', nodemacindex);
    } else {
      index = localStorage.getItem('index')
      nodemacindex = localStorage.getItem('siteid1');
    }
    var getUrl = this.url + "/GetTodayEnergyUnitNewDayMonth?FromDate=" + startDate + "&toDate=" + endDate + "&NodeID=" + nodemacindex;
    return this._http.get(getUrl);
  }


  loadEnergyByYear(nid, startDate, endDate) {
    let nodemacindex;
    let index
    let nodeid;
    if (nid != null && nid != undefined) {
      nodeid = nid;
      localStorage.setItem('nodeid', nid);
    }
    else {
      nodeid = localStorage.getItem('nodeid');
    }
    if (this.nodeMacIndex != undefined && this.nodeMacIndex != null) {
      index = this.nodeMacIndex;
      localStorage.setItem('index', index);
      nodemacindex = nodeid[index][0]['NodeMacid'];
      localStorage.setItem('siteid1', nodemacindex);
    } else {
      index = localStorage.getItem('index')
      nodemacindex = localStorage.getItem('siteid1');
    }
    var getUrl = this.url + "/GetYearsEnergyUnitsNew?FromDate=" + startDate + "&toDate=" + endDate + "&NodeID=" + nodemacindex;
    return this._http.get(getUrl);

  }
}

