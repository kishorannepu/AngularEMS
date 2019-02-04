var express=require('express')
var mongojs = require('mongojs'); 
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyparser=require('body-parser');
var config=require('./config.js');
var err_fs = require('fs'); 
var async = require('async');
var UserName=config.username;
var Pwd=config.password;
var SystemIP=config.ip;
var Database=config.database;
var ConnectionString=UserName+':'+Pwd+'@'+SystemIP+'/'+Database;
 
var db = mongojs(ConnectionString, ['DeviceData', 'EnterpriseMaster', 'GatewayAssignTransaction', 'GatewayConfigMaster', 'GatewayTypeMaster', 'NodeConfigMaster', 'NodeTypeMaster', 'RoleMaster', 'SensorSettingsTransaction', 'SensorTypeMaster', 'SeqMaster', 'SiteMaster', 'UserMaster', 'UserSensorTransaction','LiveNodeData','UserAssertsTransaction','SensorGroupMaster','SensorGroupTransaction','UserAudit','AnomalyResults','PrintSensorsGroupMaster','PrintSensorGroupTransaction','SiteSensorTransaction','SiteUserMapTransaction','SectionMasterTransaction','SchedulerResults']);
var app=express();
var ObjectId=mongojs.ObjectId; 
var bodyParser=require('body-parser');
var morgan=require('morgan');
var jwt=require('jsonwebtoken');
//var JSON=require('JSON')
app.set('superSecret',config.secret);
app.use(bodyParser.urlencoded({extended:false}));
var url = 'mongodb://'+ConnectionString;
var monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

app.listen(9998);
console.log("Port Run on 9998");
app.use(bodyparser.json());
app.use(function(req, res, next) {   
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return next();
});  
  
var apiRoutes=express.Router();
apiRoutes.use(bodyparser.json());
apiRoutes.use(bodyParser.urlencoded({extended:false}));
app.use('/api',apiRoutes);

//login query

app.get('/GetEnegyforFMSbyNid',function(req,res){
	try{
	            var EntCode=req.query.EntCode;
                var SiteId=req.query.SiteId;
				 
               db.NodeConfigMaster.find({$or:[{MACId:"n1545211963703"},{MACId:"n1545211963704"}]},function(err1,docs1){
                         if(err1){
                                res.send(err1)
                               }
                             if(docs1){       
                                 res.send(docs1); 
                              } 
                })
	      }
	    catch(ee){
		ErrorLog("==> Error in GetEnegyforFMSbyNid \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

app.get('/GetpowerPo4PeakmaxminFMS',function(req,res){
	try{
	             
                var nodeMacId=req.query.NodeMacId;
                var stDate=parseInt(req.query.StartDate)/1000;
                var enDate=parseInt(req.query.EndDate)/1000;

                //console.log(stDate+"  "+enDate) 
				 
               db.DeviceData.find({"node.nid":nodeMacId,"node.udt":{"$gte":stDate,"$lt":enDate}}).sort({"node.po4":1}).limit(1,function(err1,docs1){
                         if(err1){
                                res.send(err1)
                               }
                             if(docs1){       
                                  db.DeviceData.find({"node.nid":nodeMacId,"node.udt":{"$gte":stDate,"$lt":enDate}}).sort({"node.po4":-1}).limit(1,function(err2,docs2){
					                         if(err2){
					                                res.send(err2)
					                               }
					                             if(docs2){
					                               var peakminmaxobj={
					                               	maxpeak:docs1,
					                               	minpeak:docs2
					                               }       
					                                 res.send(peakminmaxobj); 
					                              } 
					                }) 
                              } 
                })
	      }
	    catch(ee){
		ErrorLog("==> Error in GetpowerPo4PeakmaxminFMS \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

app.get('/GetAllpowerPo4DataFMS',function(req,res){
	try{
	             
                var nodeMacId=req.query.NodeMacId;
                var stDate=parseInt(req.query.StartDate)/1000;
                var enDate=parseInt(req.query.EndDate)/1000;

                //console.log(stDate+"  "+enDate) 
				 
               db.DeviceData.find({"node.nid":nodeMacId,"node.udt":{"$gte":stDate,"$lt":enDate}},function(err1,docs1){
                         if(err1){
                                res.send(err1)
                               }
                             else{       
                                  res.send(docs1) 
                             } 
                })
	      }
	    catch(ee){
		ErrorLog("==> Error in GetAllpowerPo4DataFMS \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

app.get('/GetchillersDataFMSApi',function(req,res){
	try{       
				var nodeid=req.query.nodeid;
                var stDate=parseInt(req.query.StartDate)/1000;
                var enDate=parseInt(req.query.EndDate)/1000; 
              
                db.EnergyHourlyData.find({"nid":nodeid,"startTime":{"$gte":stDate,"$lt":enDate}},function(err1,docs1){
                         if(err1){
                                res.send(err1)
                                }
                           if(docs1){       
                                 res.send(docs1); 
                                 } 
                })
	      }
	    catch(ee){
		ErrorLog("==> Error in GetchillersDataFMSApi \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

app.get('/GetcyclesinDateRange',function(req,res){
	try{
	            var EntCode=req.query.EntCode;
                var SiteId=req.query.SiteId;
				var SectionID=req.query.SectionID;
                var stDate=parseInt(req.query.StartDate)/1000;
                var enDate=parseInt(req.query.EndDate)/1000; 
              
                db.SchedulerResults.find({EnterpriseCode:EntCode,SectionID:SectionID,SiteID:SiteId,"udt":{"$gte":stDate,"$lt":enDate}},function(err1,docs1){
                           if(err1){
                                    res.send(err1)
                                   }
                                if(docs1){       
                                   res.send(docs1); 
                                 } 
                })
	      }
	    catch(ee){
		ErrorLog("==> Error in GetcyclesinDateRange \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

app.post('/GetnodesHistorybyTime',function(req,res){
	try{        var ndObject=req.body
                var nodesId=ndObject.objSitesnode; 
                var stDate=parseInt(ndObject.FromDate)/1000;
                var enDate=parseInt(ndObject.ToDate)/1000;
                var sitTime=parseInt(ndObject.siteStarttime); 
               db.EnergyHourlyData.aggregate([{"$match":{"nid":{$in:nodesId},"startTime":{$gte:stDate,$lt:enDate},"startvalue":{$ne:"NULL"},"StartHr":sitTime}}],function(err1,docs1){
                         if(err1){
                                res.send(err1)
                               }
                             else{       
                                  res.send(docs1) 
                             } 
                })
	      }
	    catch(ee){
		ErrorLog("==> Error in GetnodesHistorybyTime \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

app.get('/GetSectionsLineChartApi',function(req,res){
	try{
		  
 		var SectionId = req.query.SectionId;
 		var SiteId = req.query.SiteId;
		var EnterpriseCode=req.query.EnterpriseCode;
		var vFromDate = parseInt(req.query.FromDate)/1000;   
 		var vToDate = parseInt(req.query.ToDate)/1000;  

 		db.SectionMasterTransaction.find({SGMID : SectionId,SiteId:SiteId,EnterpriseCode:EnterpriseCode},function(nodeErr,nodeResp){
 				if(nodeResp.length>0){ 
				var sensId="$node."+""+nodeResp[0].SensorName
				 
	 			if(nodeErr){
                    console.log(nodeErr)
	 			}
	 			else if(nodeResp){
	 				db.DeviceData.aggregate({$match:{"node.nid":nodeResp[0].NodeMacid,"node.udt":{$gte:vFromDate,$lt:vToDate}}},{$unwind:"$node"},{$project:{"_id":0,result:sensId,udt:"$node.udt"}},function(liveErr,liveReps){
	 	 					if(liveErr){
                         console.log(liveErr)
	 					}
	 					else if(liveReps){
	 						 
	 						res.send(liveReps);
	 					}
	 				})
	 			}
	 		 }
 		}) 		  
	}
	catch(ee){
		ErrorLog("==> Error in GetSectionsLineChartApi \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})



app.post('/loginUser', function(req, res) {
  	try {
	    var loginUserObj = req.body; 
	    var loginUserUsername = loginUserObj.username;
	    var pass = loginUserObj.pass;
	    var SiteCode = loginUserObj.EntCode;
	    var decodedLoginUserUsername = (new Buffer(loginUserUsername, 'base64').toString('ascii'));
	 
	    var decodedLoginpass = (new Buffer(pass, 'base64').toString('ascii'));
	    var decodedSiteCode = (new Buffer(SiteCode, 'base64').toString('ascii'));
 
	    db.UserMaster.findOne({"UserName": decodedLoginUserUsername,EnterpriseCode: decodedSiteCode,AYN: "Y"}, function(err, user) {
	      	 
           var ObjUserAudit={
            UA_Username : decodedLoginUserUsername,
			UA_DateTime : new Date() ,
			UA_Type : loginUserObj.UA_Type,			
			UA_Timestamp : parseInt(Date.now()/1000)
           }

	      	if (err) throw err;
	      	else if (!user) {
	        	res.send({success: false,message: 'Authentication failed. User not found.'});
	        	ObjUserAudit.UA_Type ='Attempt';	
                ObjUserAudit.UA_Status='AttemptFailed'; 
                ObjUserAudit.UA_Remarks='Attempt Failed';


	      	} else if (user) {
	        	var decodedDBPass = (new Buffer(user.Password, 'base64').toString('ascii'));
	         
	        	if (decodedDBPass != decodedLoginpass) {
	          		res.json({success: false,message: 'Authentication failed. Wrong password.'})
	          	   ObjUserAudit.UA_Type ='Attempt';
                   ObjUserAudit.UA_Status='AttemptFailed'; 
                   ObjUserAudit.UA_Remarks='Attempt Failed';

	        	} else if (decodedSiteCode != user.EnterpriseCode) {
	          		res.json({success: false,message: 'Authentication failed. Wrong Site'})
	          		ObjUserAudit.UA_Type ='Attempt';
                    ObjUserAudit.UA_Status='AttemptFailed'; 
                    ObjUserAudit.UA_Remarks='Attempt Failed';

	        	} else {
	          	
	          		db.EnterpriseMaster.find({EnterpriseCode:decodedSiteCode,AYN:"Y"},function(err,docs){
								if(err){
									res.send(err)
								}
								if(docs){
								  var token = jwt.sign(user, app.get('superSecret')); //, {'expiresIn': 24000}
								  user.EnterpriseName=docs[0].EnterpriseName;
								  user.AddUI=docs[0].AddUI;
								  user.EntObject=docs[0];		 
								  res.json({success: true,message: "enjoy token",token: token,userObj: user});				 
									//res.send(docs);			
								}
							 })	          		    
	          		
	          		ObjUserAudit.UA_Status='LoginSuccess'; 
                    ObjUserAudit.UA_Remarks='Login Sucessfull';                  
	        	}
	      	}
          
          UserAuditLog(ObjUserAudit)

	    })
  	} catch(ee){
		ErrorLog("==> Error in loginUser \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})
function getDateFormat(dtCurrent){
	var dtNow = new Date(dtCurrent*1000);

	var cYr = dtNow.getFullYear();
	var cmnth = dtNow.getMonth();
	var cDay = dtNow.getDate().toString();
	var cHr = dtNow.getHours().toString();
	var cMin = dtNow.getMinutes().toString();

	if(cDay.length==1)
		cDay = "0"+ cDay;

	if(cHr.length==1)
		cHr = "0"+ cHr;

	if(cMin.length==1)
		cMin = "0"+ cMin;

	var returnDt = cDay+"-"+monthsArr[cmnth]+"-"+cYr+" "+cHr+":"+cMin;

	return returnDt;
}

function getDateFormatByDate(dtCurrent){
	var dtNow = new Date(dtCurrent*1000);
	 
	var cYr = dtNow.getFullYear();
	 
	var cmnth = dtNow.getMonth();
	var cDay = dtNow.getDate().toString();
	var cHr = dtNow.getHours().toString();
	var cMin = dtNow.getMinutes().toString();

	if(cDay.length==1)
		cDay = "0"+ cDay;

	if(cHr.length==1)
		cHr = "0"+ cHr;

	if(cMin.length==1)
		cMin = "0"+ cMin;

	var returnDt = cDay+"-"+monthsArr[cmnth]+"-"+cYr;

	return returnDt;
}

function getDateFormatByTime(dtCurrent){
	var dtNow = new Date(dtCurrent*1000);

	var cYr = dtNow.getFullYear();
	var cmnth = dtNow.getMonth();
	var cDay = dtNow.getDate().toString();
	var cHr = dtNow.getHours().toString();
	var cMin = dtNow.getMinutes().toString();

	if(cDay.length==1)
		cDay = "0"+ cDay;

	if(cHr.length==1)
		cHr = "0"+ cHr;

	if(cMin.length==1)
		cMin = "0"+ cMin;

	var returnDt = cHr+":"+cMin;

	return returnDt;
}
 
// token authenticating
apiRoutes.use(function(req, res, next) {
	if (req.headers) {}
	var token = req.query.token || req.body.token || req.headers['x-access-token'];

	if (token) {
	   	jwt.verify(token, app.get('superSecret'), function(err, decoded) {
		    if (err) {
	        	res.send({success: false,message: "failed to authenticate token"})
	      	} else {
	        	req.decoded = decoded;
	        	next();
	      	}
	    });
	} 
	else {
	    return res.status(403).send({success: false,message: 'No token provided.'});
	}
});
 

apiRoutes.get('/GettAllUserSenosrs',function(req,res){
	try{
		var EntCode = req.query.EntCode;   
 		var userId = req.query.Userid
 		 
 		db.UserSensorTransaction.find({EnterpriseCode:EntCode,UserCode:userId,AYN:"Y"},function(err,docs){
			if(err){
				res.send(err)
			}
			if(docs){				 
				res.send(docs);			
			}			 		
		})
	}
	catch(ee){
		ErrorLog("==> Error in GettAllUserSenosrs \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

apiRoutes.get('/GettAllNodesByEntCode',function(req,res){
	try{
		var EntCode = req.query.EntCode;   
 		//var userId = req.query.Userid
 		 
 		db.SensorGroupMaster.find({EnterpriseCode:EntCode,AYN:"Y"},function(err,docs){
			if(err){
				res.send(err)
			}
			if(docs){				 
				res.send(docs);			
			}			 		
		})
	}
	catch(ee){
		ErrorLog("==> Error in GettAllNodesByEntCode \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

apiRoutes.get('/GetGroupedSensBySGMID',function(req,res){
	try{
		var SGroupId = req.query.SGMID;
		var EnterpriseCode = req.query.EnterpriseCode;
		var UserCode = req.query.UserCode;
        
        db.UserAssertsTransaction.find({EnterpriseCode:EnterpriseCode,UserCode:UserCode,AYN:'Y'},function(usrerr,usrRes){
        
        if(usrerr){

        }else{
        	//console.log(usrRes);
        	if(usrRes.length>0){
        	   
        		db.SensorGroupTransaction.find({SGMID:SGroupId,AYN:"Y"},function(err,docs){
					if(err){
						res.send(err)
					}
					if(docs){	
					//console.log(docs)			 
					  res.send(docs);			
					}			 		
				  })
        	}else{
        		//console.log("not available")
        		res.send([]); 
        	} 		   
		 }
	   })        
	}
	catch(ee){
		ErrorLog("==> Error in GetGroupedSensBySGMID \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

app.get('/GetUserSenosrsLiveData',function(req,res){
	try{
		var gatewayId = req.query.GWId;   
 		var nodeId = req.query.NodeMacId;
 		var sensorid = req.query.SensId;

 		db.NodeConfigMaster.find({MACId : nodeId},{Sensors:{$elemMatch:{"SensorName" : sensorid}}},function(nodeErr,nodeResp){
 				//console.log(nodeResp);
	 			if(nodeErr){

	 			}
	 			else if(nodeResp){
	 				db.LiveNodeData.find({node:{$elemMatch:{"nid" : nodeId}}},function(liveErr,liveReps){
	 					//console.log(liveReps); gid : gatewayId,
	 					if(liveErr){

	 					}
	 					else if(liveReps){
	 						//console.log(liveReps);
	 						var objResponseData={};
	 						objResponseData.SensSettings=nodeResp[0];
	 						objResponseData.SensLiveData=liveReps[0];

	 						res.send(objResponseData);
	 					}
	 				})
	 			}
	 		 
 		}) 		  
	}
	catch(ee){
		ErrorLog("==> Error in GetUserSenosrsLiveData \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

apiRoutes.get('/GetSensorSettingsByNodeIdSensId',function(req,res){
	try{
		var NodeId = req.query.NodeMacId;   
 		var SensId = req.query.SensId;

 		db.NodeConfigMaster.find({"MACId" : NodeId,"Sensors.SensorName":SensId,Sensors:{$elemMatch:{"SensorName":SensId}}},{Sensors:{$elemMatch:{"SensorName":SensId}}},function(err,resp){
 			if(err){
				res.send(err)
			}
			if(resp){				 
				res.send(resp);			
			}	
 		}) 
	}
	catch(ee){
		ErrorLog("==> Error in GetSensorSettingsByNodeIdSensId \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

apiRoutes.get('/GetNodeHistoryData',function(req,res){
	try{
		//var gatewayId = req.query.GWId;   
 		var nodeId = req.query.NodeMacId;
 		var sensorid = req.query.SensId;
 		var vFromDate = req.query.FromDate/1000;   
 		var vToDate = req.query.ToDate/1000; 
 	
 		
 		MongoClient.connect(url, function(err, mondb) {
 			var collection = mondb.collection('DeviceData');
 			var senscode = "node."+sensorid; 			 
 			var query1 ={"node.nid":nodeId,"node.udt":{$gte:vFromDate,$lt:vToDate}}; //"gid":gatewayId, 
 			var query2={};  //senscode:1,"node.udt":1
 			query2[senscode]=1;
 			query2['node.udt']=1;
 			 
 			collection.find(query1,query2).sort({"node.udt":1}).toArray(function(err, docs) {    	
				res.json(docs)
			}); 
 		}) 
 		
	}
	catch(ee){
		ErrorLog("==> Error in GetNodeHistoryData \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

apiRoutes.get('/getsmsAlertCount',function(req,res){	 
	try{
		var NodeMacID=req.query.NodeMacID;
		var SensorID=req.query.SensorID; 
	    var startDate=req.query.fromDatedata;
		var endDate=req.query.toDatedata;


	 	db.AlertsLog.find({"NodeMacId":NodeMacID,"SMSFlag":"Y","SensorId" : SensorID,"Timestamp":{$gte:parseInt(startDate),$lt:parseInt(endDate)}},function(err,docs){
	 		if(err){
				 console.log("error in getsmsAlertCount :"+err)
			}else if(docs){				
				res.send(docs);
			}		  
		 }
    )	
	}catch(Exception){
		 console.log("==> Error in getsmsAlertCount :"+Exception);
	}	
});

apiRoutes.get('/getAssertsByUsercode',function(req,res){	 
	try{		
		var EnterpriseCode=req.query.EntCode; 
		var UserCode=req.query.UserCode; 

	 	db.UserAssertsTransaction.find({"UserCode":UserCode,"EnterpriseCode":EnterpriseCode,"AYN" : "Y"},function(err,docs){
	 		if(err){
				 console.log("error in getAssertsByUsercode :"+err)
			}else if(docs){				
				res.send(docs);
			}		  
		})	
	}catch(Exception){
		 console.log("==> Error in getAssertsByUsercode :"+Exception);
	}	
});

apiRoutes.get('/getSensorsBySensorGroupId',function(req,res){	 
	try{		
		var EnterpriseCode=req.query.EntCode; 
		var SGID=req.query.SGID; 

	 	db.SensorGroupTransaction.find({"SGMID":SGID,"EnterpriseCode":EnterpriseCode,"AYN" : "Y"},function(err,docs){
	 		if(err){
				 console.log("error in getSensorsBySensorGroupId :"+err)
			}else if(docs){				
				res.send(docs);
			}		  
		})	
	}catch(Exception){
		 console.log("==> Error in getSensorsBySensorGroupId :"+Exception);
	}	
});

apiRoutes.get('/UpdateUserSettings',function(req,res){   
	try{
		var userUpdateObj=JSON.parse(req.query.updateUserObject)
		var UserDetails=userUpdateObj;

		db.UserMaster.update({_id:ObjectId(UserDetails._id)},{$set:{DisplayName:UserDetails.DisplayName,PhoneNumber:UserDetails.PhoneNumber,MUser:UserDetails.MUser,MDate:new Date()}},function(err,resDocs){
			if(err){
				res.send(err)
			}else if(resDocs){
				res.send("Updated SucessFully");
			}
		})  
	}
	catch(ee){
		 console.log("exception in   UpdateUserSettings  :"+ee)
	} 		  	  
});

apiRoutes.get('/UpdateLoginUserPwd',function(req,res){
	try{
		var ResetPassObj=JSON.parse(req.query.ResetPassObj);	
		db.UserMaster.update({_id:ObjectId(ResetPassObj._id)},{$set:{"Password":ResetPassObj.newPassword,"MUser":ResetPassObj.mUser,"MDate":new Date()}},function(updatePassErr,UpdatePassDocs){
			if(updatePassErr){
				console.log("error in :"+updatePassErr)
			}else if(UpdatePassDocs){
				res.send(UpdatePassDocs);
			}
		})	
	}
	catch(ee){
		 console.log("exception in  UpdateLoginUserPwd  :"+ee)
	}
});

apiRoutes.get('/SavePrintClickAudit',function(req,res){
	try{
		var UserName =req.query.UserName;
		var PrintSensorName =req.query.PrintSensorName;
		var PrintStartTime =req.query.PrintStartTime;
		var PrintEndTime =req.query.PrintEndTime;

		
		var ObjUserAudit={
            UA_Username : UserName,
			UA_DateTime : new Date() ,
			UA_Type : 'Print',
			UA_PrintSensorName : PrintSensorName,
			UA_PrintStartTime : PrintStartTime ,
			UA_PrintEndTime : PrintEndTime,			
			UA_Timestamp : parseInt(Date.now()/1000),
			UA_Status:'Print Click',
			UA_Remarks:'Print',

        } 

        UserAuditLog(ObjUserAudit);
        res.send("success");
	}
	catch(ee){
		 console.log("exception in  SavePrintClickAudit  :"+ee)
	}
});

apiRoutes.get('/LogoutClickAudit',function(req,res){
	try{
		var UserName =req.query.UserName; 

		var ObjUserAudit={
            UA_Username : UserName,
			UA_DateTime : new Date() ,
			UA_Type : 'Logout',				
			UA_Timestamp : parseInt(Date.now()/1000),
			UA_Status:'Logout Click',
			UA_Remarks:'Logout Sucessfull',
        } 

        UserAuditLog(ObjUserAudit);
        res.send("success");
	}
	catch(ee){
		 console.log("exception in  LogoutClickAudit  :"+ee)
	}
});


function UserAuditLog(UserAuditObject){ 

    try{  
    	db.UserAudit.insert(UserAuditObject);
    }catch(ee){ 
        ErrorLog("==> Error in UserAuditLog \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
    }
}

apiRoutes.get('/getPredictionResults',function(req,res){	 
	try{
		var NodeId=req.query.NodeId;
		var SensorId=req.query.SensorId; 
 
	 	db.PredictionResults.find({"nid":NodeId,"SensorId" : SensorId}).sort({_id:-1}).limit(1,function(err,docs){
	 		if(err){
				 console.log("error in getPredictionResults :"+err);
			}else if(docs){	
			    			
				res.send(docs);
			}		  
		 }
     )	
	}catch(Exception){
		 console.log("==> Error in getPredictionResults :"+Exception);
	}	
});

//getTop5AlertsLogResults

apiRoutes.get('/getTop5AlertsLogResults',function(req,res){	 
	try{
		var NodeId=req.query.NodeId;
		var SensorId=req.query.SensorId;  
 
	 	db.AlertsLog.find({"NodeMacId":NodeId,"SensorId" : SensorId,"CurrentStatus":{$ne:"Normal"},"Status":{$ne:"Undefined"}}).sort({_id:-1}).limit(5,function(err,docs){
	 		if(err){
				 console.log("error in getTop5AlertsLogResults :"+err);
			}else if(docs){	
			    			
				res.send(docs);
			}		  
		 }
     )	
	}catch(Exception){
		 console.log("==> Error in getTop5AlertsLogResults :"+Exception);
	}	
});

//getAnomalyResults

apiRoutes.get('/getAnomalyResults',function(req,res){	 
	try{
		var NodeId=req.query.NodeId;
		var SensorId=req.query.SensorId;  
 
	 	db.AnomalyResults.find({"nid":NodeId,"SensorId" : SensorId}).sort({_id:-1}).limit(1,function(err,docs){
	 		if(err){
				 console.log("error in getAnomalyResults :"+err);
			}else if(docs){	
			    			
				res.send(docs);
			}		  
		 }
     )	
	}catch(Exception){
		 console.log("==> Error in getAnomalyResults :"+Exception);
	}	
});

//GetNodeLiveOneData

apiRoutes.get('/GetNodeLiveOneAPIData',function(req,res){
	try{
		  
 		var nodeId = req.query.NodeMacId;
 		var sensorid = req.query.SensId;   //DeviceData
 		 
 		//db.LiveNodeData.find({node:{$elemMatch:{"nid" : nodeId}}},function(liveErr,liveReps){
 		db.DeviceData.find({node:{$elemMatch:{"nid" : nodeId}}}).sort({_id:-1}).limit(1,function(liveErr,liveReps){
 			if(liveReps){
 				 
 				db.NodeConfigMaster.find({MACId : nodeId},{Sensors:{$elemMatch:{"SensorName" : sensorid}}},function(err1,res1){
					var SensNameIS=res1[0].Sensors[0].SensorSettings.SensorName;
                     
                    var senslist = liveReps[0];  
                     
                    if(senslist){
                    	if(senslist.node){
		                    var nodedata =  senslist.node[0];                 
		                    
		                    var jsonreturn={};
							
							jsonreturn._id = senslist._id;
		                    jsonreturn.gid = senslist.gid;
		                    jsonreturn.nid = nodedata.nid;
		                    jsonreturn[sensorid] = nodedata[sensorid];
		                    jsonreturn.SensorName = SensNameIS;
		                    
		                    res.json([jsonreturn]);
		                }
		                else{
		                	res.json([]);
		                }
	                }
	                else{
	                	res.json([]);
	                }
                })
 			}
 		})

 		/*MongoClient.connect(url, function(err, mondb) {
 			var collection = mondb.collection('LiveNodeData');
 			var senscode = 'node.'+sensorid; 			 
 			var query1 ={$match:{'node.nid':nodeId}};
 			var query4 = {nid:'$node.nid',gid:1} 
            
            query4[sensorid]='$node.'+sensorid; 
 			var query2={$project:query4}; 
 			query3={$unwind:'$node'}
 			 
 			collection.aggregate(query1,query3,query2,function(err, docs) {    	
				if(docs){
                    
                    db.NodeConfigMaster.find({MACId : nodeId},{Sensors:{$elemMatch:{"SensorName" : sensorid}}},function(err1,res1){
                        
                        var SensNameIS=res1[0].Sensors[0].SensorSettings.SensorName;
                        docs[0].SensorName=SensNameIS;
                        //console.log(docs)
                        res.json(docs)

                    })

				}else{
                   console.log("Error"+err)
				}
			}); 
 		})*/ 
 		
	}
	catch(ee){
		ErrorLog("==> Error in GetNodeLiveOneAPIData \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

//GetSensorNameInApi

apiRoutes.get('/GetSensorNameInApi',function(req,res){	 
	try{
		var NodeId=req.query.NodeId;
		var SensorId=req.query.SensorId;
 
	 	db.NodeConfigMaster.find({MACId : NodeId},{Sensors:{$elemMatch:{"SensorName" : SensorId}}},function(err,docs){
	 		if(err){
				 console.log("error in GetSensorNameInApi :"+err);
			}else if(docs){	
				 if(docs[0].Sensors[0].SensorSettings!=undefined){
				 	var SensrName=docs[0].Sensors[0].SensorSettings.SensorName;                  		    			
				    res.send(SensrName);
				 }else{
				 	res.send(' ');
				 }
                  
			}		  
		 }
     )	
	}catch(Exception){
		 console.log("==> Error in GetSensorNameInApi :"+Exception);
	}	
});

// Energy api's
app.get('/GetEnergyComData',function(req,res){
	try{ 
 		var nodeId = req.query.NodeMacId; 		 
 		db.NodeConfigMaster.find({MACId : nodeId},function(nodeErr,nodeResp){
 				//console.log(nodeResp);
	 			if(nodeErr){

	 			}
	 			else if(nodeResp){
	 				db.DeviceData.find({"node.nid":nodeId}).sort({_id:-1}).limit(32,function(liveErr,liveReps){
	 					 
	 					if(liveErr){

	 					}
	 					else if(liveReps){
	 						//console.log(liveReps);
	 						var objResponseData={};
	 						objResponseData.SensSettings=nodeResp[0];
	 						objResponseData.SensLiveData=liveReps;

	 						res.send(objResponseData);
	 					}
	 				})
	 			}
	 		 
 		}) 		  
	}
	catch(ee){
		ErrorLog("==> Error in GetEnergyComData \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

app.get('/GetTodayEnergyUnits',function(req,res){
	try{
		var startTime = parseInt(req.query.FromDate);   
 		var endTime = parseInt(req.query.toDate);		
 		var nodenid = req.query.NodeID;
		//console.log(req.query);
		db.DeviceData.aggregate([{$match:{"node.nid":nodenid,"node.udt":{$gte:startTime/1000,$lt:endTime/1000},"node.e1":{$exists:true}}},{$unwind:"$node"},{ $group : {_id: {"$dateToString": {"format": "%Y-%m-%d","date": {"$add": [ "$node.cdt", 5.5*60*60000 ]}}},first: { $first: "$$ROOT" }, last: { $last: "$$ROOT"}}},{$sort:{_id:-1}}], function(resError,Response) {
 			
			  if (resError) {
				console.log(resError);
				return;
			  } else {
				res.send(Response);
			  }
			});
	 	}	
 
	catch(ee){
		ErrorLog("==> Error in GetTodayEnergyUnits \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

app.get('/GetTodayEnergyUnitNew',function(req,res){
	try{
		var startTime = parseInt(req.query.FromDate);   
 		var endTime = parseInt(req.query.toDate);		
 		var nodenid = req.query.NodeID;
		//console.log(req.query);
		db.EnergyHourlyData.aggregate([{$match:{"nid":nodenid,"startTime":{$gte:startTime/1000,$lt:endTime/1000},startvalue:{$ne:"NULL"}}},{ $group : {_id: {"$dateToString": {"format": "%Y-%m-%d","date": {"$add": [ "$startDt", 5.5*60*60000 ]}}},first: { $first: "$$ROOT" }, last: { $last: "$$ROOT"}}},{$sort:{_id:-1}}], function(resError,Response) {
 			
			  if (resError) {
				console.log(resError);
				return;
			  } else {
				res.send(Response);
			  }
			});
	 	}	
 
	catch(ee){
		ErrorLog("==> Error in GetTodayEnergyUnitNew \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

app.get('/GetTodayEnergyUnitNewDayMonth',function(req,res){
	try{
		var startTime = parseInt(req.query.FromDate);   
 		var endTime = parseInt(req.query.toDate);		
 		var nodenid = req.query.NodeID;
		//console.log(req.query);
		db.EnergyHourlyData.aggregate([{$match:{"nid":nodenid,"startTime":{$gte:startTime/1000,$lt:endTime/1000},startvalue:{$ne:"NULL"}}},{ $group : {_id: {"$dateToString": {"format": "%Y-%m-%d","date": {"$add": [ "$startDt", 5.5*60*60000 ]}}},first: { $first: "$$ROOT" }, last: { $last: "$$ROOT"}}},{$sort:{_id:-1}}], function(resError,energyHour) {
 			
			  if (resError) {
				console.log(resError);
				return;
			  } else {
				//res.send(Response);

				db.LiveNodeData.find({"node.nid":nodenid}, function(resError1,liveres) {
 			
					  if (resError1) {
						console.log(resError1);
						return;
					  } else {
					  	//energyHour
						//res.send(Response);
						if (energyHour.length > 0){
							energyHour[0].last.endValue=liveres[0].node[0].e1;
							energyHour[0].liveudt=liveres[0].node[0].udt;
						}
						res.send(energyHour)
					 
					}

				}); 
			  }
			});
	 	}	
 
	catch(ee){
		ErrorLog("==> Error in GetTodayEnergyUnitNewDayMonth \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

app.get('/GettwentyfourhrsEnergyUnitsNew',function(req,res){
	try{
		var startTime = parseInt(req.query.FromDate);   
 		var endTime = parseInt(req.query.toDate);		
 		var nodenid = req.query.NodeID;
		 
		db.EnergyHourlyData.find({"nid":nodenid,"startTime":{$gte:startTime/1000,$lt:endTime/1000},startvalue:{$ne:"NULL"}}, function(resError,responseHourData) {
 							//console.log(responseHourData.length)

			  if (resError) {
				console.log(resError);
				return;
			  } else {
			  	if(req.query.flag == "false"){
			  		res.send(responseHourData)
			  	}else{
			  		db.LiveNodeData.find({"node.nid":nodenid}, function(resError,liveres) {
			  			if (resError) {
								console.log(resError);
								return;
			 			 } else {
			 			 	
			 			 	if(responseHourData.length > 0){
								var  responseHourObj={  
								  startTime: responseHourData[responseHourData.length-1].endTime,
								  hourdifference: parseFloat(liveres[0].node[0].e1)-responseHourData[responseHourData.length-1].endValue,
								  nid: liveres[0].node[0].nid,
								  endTime: endTime/1000,
								   }
								responseHourData[responseHourData.length]=responseHourObj
								res.send(responseHourData)
			 			 	}else{
			 			 		res.send(responseHourData)
			 			 	}
			     			
			  			}
			})

			  	}
			  	
			  }
			});
	 	}	
 
	catch(ee){
		ErrorLog("==> Error in GettwentyfourhrsEnergyUnitsNew \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

app.get('/GetYearsEnergyUnitsNew',function(req,res){
	try{
		var startTime = parseInt(req.query.FromDate);   
 		var endTime = parseInt(req.query.toDate);		
 		var nodenid = req.query.NodeID;
		//console.log(req.query);
		db.EnergyHourlyData.aggregate([{$match:{"nid":nodenid,"startTime":{$gte:startTime/1000,$lt:endTime/1000},"hourdifference":{$exists:true},startvalue:{$ne:"NULL"}}},{ $group : {_id: {"$dateToString": {"format": "%Y-%m","date": {"$add": [ "$startDt", 5.5*60*60000 ]}}},first: { $first: "$$ROOT" }, last: { $last: "$$ROOT"}}},{$sort:{_id:-1}}], function(resError,Response) {
 			
			  if (resError) {
				console.log(resError);
				return;
			  } else {
				res.send(Response);
			  }
			});
	 	}	
 
	catch(ee){
		ErrorLog("==> Error in GetYearsEnergyUnitsNew \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

app.get('/GetTodayEngLiveNew',function(req,res){
	try{
		var startTime1 = parseInt(req.query.FromDate);   
 		var endTime = parseInt(req.query.toDate);		
 		var nodenid = req.query.NodeID;
		 
		db.LiveNodeData.find({"node.nid":nodenid}, function(resError,LiveNoderes) {
 			
			  if (resError) {
				console.log(resError);
				return;
			  } else {
				//res.send(Response);
				db.EnergyHourlyData.find({"startTime":{$gt:startTime1/1000},"nid":nodenid,startvalue:{$ne:"NULL"}}).limit(1,function(resError1,EnergyHourly) {
 			
			  if (resError1) {
				console.log(resError1);
				return;
			  } else {

			  	if(EnergyHourly.length >0 &&LiveNoderes.length>0){
				 
						var liveEng=LiveNoderes[0].node[0].e1;
						var livenodeudt=LiveNoderes[0].node[0].udt;
						var HourlyEng=EnergyHourly[0].startvalue;
						 
						var TodayObj={
							TodayConsumEng:liveEng-HourlyEng,
							Nodeid:nodenid,
							livenodeudt:livenodeudt
						}
				 }
				res.send(TodayObj);
			  }

			  })
			}

			});
	 	}	
 
	catch(ee){
		ErrorLog("==> Error in GetTodayEngLiveNew \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

app.get('/GetPeaktimeEnergyUnits',function(req,res){
	try{
		var startTime = parseInt(req.query.FromDate);   
 		var endTime = parseInt(req.query.toDate);		
 		var nodenid = req.query.NodeID;
		//console.log(req.query);
		db.DeviceData.aggregate([{$match:{"node.nid":nodenid,"node.udt":{$gte:startTime/1000,$lt:endTime/1000}}},{$unwind:"$node"},{ $group : {_id: {"$dateToString": {"format": "%Y-%m-%d","date": {"$add": [ "$node.cdt", 5.5*60*60000 ]}}},first: { $first: "$$ROOT" }, last: { $last: "$$ROOT"}}},{$sort:{_id:1}}], function(resError,Response) {
 			
			  if (resError) {
				console.log(resError);
				return;
			  } else {
				res.send(Response);
			  }
			});
	 	}	
 
	catch(ee){
		ErrorLog("==> Error in GetPeaktimeEnergyUnits \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

apiRoutes.get('/UpdateSensorSettingNumber',function(req,res){   
	try{
		var NodeMacId=req.query.NodeMacId;
		var SensorId=req.query.SensorId;
		var SensSettStatus=req.query.SensSettStatus;
		var setVal=req.query.setVal;

		var qury1 = "Sensors.$.SensorSettings."+SensSettStatus;
        var qrstr={}
		qrstr[qury1]=setVal;		 
        
		db.NodeConfigMaster.update({"MACId":NodeMacId,"Sensors.SensorName":SensorId},{$set:qrstr},function(err,resDocs){
			if(err){
				res.send(err)
			}else if(resDocs){
				res.send(resDocs);
			}
		})  
	}
	catch(ee){
		 console.log("exception in UpdateSensorSettingNumber :"+ee)
	} 		  	  
});
 
apiRoutes.get('/GetPrintSensGrpByEntcode',function(req,res){	 
	try{		
		var EnterpriseCode=req.query.EntCode; 
		 
	 	db.PrintSensorsGroupMaster.find({"EnterpriseCode":EnterpriseCode,"AYN" : "Y"},function(err,docs){
	 		if(err){
				 console.log("error in GetPrintSensGrpByEntcode :"+err)
			}else if(docs){				
				res.send(docs);
			}		  
		})	
	}catch(Exception){
		 console.log("==> Error in GetPrintSensGrpByEntcode :"+Exception);
	}	
});

app.get('/GetPrintedSensPreview',function(req,res){
	try{
		var startDT = parseInt(req.query.fromDt);
		var endDT = parseInt(req.query.toDt);
		var rptInterval=parseInt(req.query.rptDuration);
		var Nodeid=req.query.Nodeid;
		var Macid=req.query.Macid;
		var Entcode=req.query.Entcode;
 
		db.DeviceData.find({"node.udt":{$gte:startDT,$lte:endDT},"node.nid":Macid},function(ddpErr,ddpResponse){
			if(ddpErr){

			}
			else{ 
				var lstDurationRpt = [];
				var iIntervalCount=1;
				//console.log(ddpResponse)
				if(ddpResponse.length>1){
					var compareDate = ddpResponse[0].node[0].udt;       
					for(var tt=startDT; tt <= endDT ; tt=(tt+(rptInterval*60))){
						for(mm in ddpResponse){
							if(Math.abs(tt-ddpResponse[mm].node[0].udt) < 60){
								lstDurationRpt.push(ddpResponse[mm]);
								break;
							}
						}
					} 	 
				}
				 
			res.send(lstDurationRpt);
				 							 		
			}
		})
	} catch(ee){
		ErrorLog("==> Error in GerReportPreview \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

//GetPrintAsignSensorsGrp
app.get('/GetPrintAsignSensorsGrp',function(req,res){	 
	try{		
		var EnterpriseCode=req.query.EntCode;
		var Nodeid=req.query.Nodeid;  

		//console.log(EnterpriseCode+"  "+Nodeid)
		 
	 	db.PrintSensorGroupTransaction.find({"EnterpriseCode":EnterpriseCode,"AYN" : "Y","NodeId" :Nodeid},function(err,docs){
	 		if(err){
				 console.log("error in GetPrintAsignSensorsGrp :"+err)
			}else if(docs){		
			//console.log(docs)		
				res.send(docs);
			}		  
		})	
	}catch(Exception){
		 console.log("==> Error in GetPrintAsignSensorsGrp :"+Exception);
	}	
});

//
app.get('/GetEachPointHistoryData',function(req,res){
	try{
		   
 		var nodeId = req.query.NodeMacId;
 		var sensorid = req.query.SensId;
 		var vFromDate = req.query.FromDate/1000;   
 		var vToDate = req.query.ToDate/1000; 
 		var SensorHistoryChartData1=[]
 	
 		
 		MongoClient.connect(url, function(err, mondb) {
 			var collection = mondb.collection('DeviceData');
 			var senscode = "node."+sensorid; 			 
 			var query1 ={"node.nid":nodeId,"node.udt":{$gte:vFromDate,$lt:vToDate}}; //"gid":gatewayId, 
 			var query2={};  //senscode:1,"node.udt":1
 			query2[senscode]=1;
 			query2['node.udt']=1;
 			 
 			collection.find(query1,query2).sort({"node.udt":1}).toArray(function(err, response) {
           
            var currNodeMin=response[0].node[0];
            var Curmin=new Date(currNodeMin.udt*1000);
            var dtHistMin=Curmin.getMinutes();
            var lstDurationRpt=[]; 

                   for(var tt=vFromDate; tt <= vToDate ; tt=(tt+(4*60))){
					for(mm in response){
						
						if(Math.abs(tt-response[mm].node[0].udt) < 60){
							//console.log(response[mm].node[0].udt+"   "+tt)
							var dtHist=new Date(response[mm].node[0].udt*1000);
							var currNode = response[mm].node[0];
							var latestValHist = parseFloat(currNode[sensorid]);
							var obj={
			                       myTime:dtHist.getHours()+":"+dtHist.getMinutes(),
			                       myCurrent:latestValHist
			                   } 
							lstDurationRpt.push(obj);
							break;
						}
					} 
				} 
           
				 if(mm==response.length-1){
					res.json(lstDurationRpt)
                 } 

				/*}*/
			}); 
 		}) 
 		
	}
	catch(ee){
		ErrorLog("==> Error in GetEachPointHistoryData \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

app.get('/GetYearsEnergyUnits',function(req,res){
	try{
		var startTime = parseInt(req.query.FromDate);   
 		var endTime = parseInt(req.query.toDate);		
 		var nodenid = req.query.NodeID;
		//console.log(req.query);
		db.DeviceData.aggregate([{$match:{"node.nid":nodenid,"node.udt":{$gte:startTime/1000,$lt:endTime/1000},"node.e1":{$exists:true}}},{$unwind:"$node"},{ $group : {_id: {"$dateToString": {"format": "%Y-%m","date": {"$add": [ "$node.cdt", 5.5*60*60000 ]}}},first: { $first: "$$ROOT" }, last: { $last: "$$ROOT"}}},{$sort:{_id:1}}], function(resError,Response) {
 			
			  if (resError) {
				console.log(resError);
				return;
			  } else {
				res.send(Response);
			  }
			});
	 	}	
 
	catch(ee){
		ErrorLog("==> Error in GetYearsEnergyUnits \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

app.get('/GettwentyfourhrsEnergyUnits',function(req,res){
	try{
		var startTime = parseInt(req.query.FromDate);   
 		var endTime = parseInt(req.query.toDate);		
 		var nodenid = req.query.NodeID;
		//console.log(req.query);
		db.DeviceData.aggregate([{$match:{"node.nid":nodenid,"node.udt":{$gte:startTime/1000,$lt:endTime/1000},"node.e1":{$exists:true}}},{$unwind:"$node"},{ $group : {_id: {"$dateToString": {"format": "%Y-%m-%d %H","date": {"$add": [ "$node.cdt", 5.5*60*60000 ]}}},first: { $first: "$$ROOT" }, last: { $last: "$$ROOT"}}},{$sort:{_id:1}}], function(resError,Response) {
 			
			  if (resError) {
				console.log(resError);
				return;
			  } else {
				res.send(Response);
			  }
			});
	 	}	
 
	catch(ee){
		ErrorLog("==> Error in GettwentyfourhrsEnergyUnits \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

apiRoutes.get('/GetSubmeterGrpByEntCode',function(req,res){
	try{
		var EntCode = req.query.EntCode;  
		var SensGrpType = req.query.SensorGrpType;  

 		//var userId = req.query.Userid
 		 
 		db.SensorGroupMaster.find({EnterpriseCode:EntCode,"SensGroupType" :SensGrpType,AYN:"Y"},function(err,docs){
			if(err){
				res.send(err)
			}
			if(docs){				 
				res.send(docs);			
			}			 		
		})
	}
	catch(ee){
		ErrorLog("==> Error in GetSubmeterGrpByEntCode \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

app.get('/GetToatalTodayEnergyUnits',function(req,res){
	try{
		var docs={};
		 docs['startTime'] = parseInt(req.query.FromDate);   
 		docs['endTime'] = parseInt(req.query.toDate);		
 		docs ['nodenid']= req.query.NodeID;
  		docs['sensorid'] = (req.query.SensID).split(",");
 			getEachRecordValue(docs, function(err, sensorFinalData) {
		           //console.log("-------------")
		           res.send(sensorFinalData)
		    }) 
	 	}	
 
	catch(ee){					 

		ErrorLog("==> Error in GetToatalTodayEnergyUnits \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

 
apiRoutes.get('/GetSenssorNamesbyMacid',function(req,res){
	try{
		var NodeMacid = req.query.NodeMacid;  
		 
 		db.NodeConfigMaster.find({"MACId":NodeMacid,AYN:"Y"},function(err,docs){
			if(err){
				res.send(err)
			}
			if(docs){				 
				res.send(docs);			
			}			 		
		})
	}
	catch(ee){
		ErrorLog("==> Error in GetSenssorNamesbyMacid \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

//GetAllSitesForTileview
apiRoutes.get('/GetAllSitesForTileview',function(req,res){
	try{
		var EnterpriseCode = req.query.EntCode;  
		 
 		db.SiteMaster.find({"EntCode":EnterpriseCode,AYN:"Y"},function(err,docs){
			if(err){
				res.send(err)
			}
			if(docs){				 
				res.send(docs);			
			}			 		
		})
	}
	catch(ee){
		ErrorLog("==> Error in GetAllSitesForTileview \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

app.get('/GetPowerConsumptionsSinglePoint',function(req,res){
	try{
		 		
 		var nodenid = req.query.NodeID;
		 
		db.DeviceData.find({"node.nid":nodenid}).sort({"_id":-1}).limit(6,function(resError,Response) {
 			
			  if (resError) {
				console.log(resError);
				return;
			  } else {
				res.send(Response);
			  }
			});
	 	}	
 
	catch(ee){
		ErrorLog("==> Error in GetPowerConsumptionsSinglePoint \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

app.get('/GetNodemacIdBySiteId',function(req,res){
	try{
		var EntCode=req.query.EntCode;
        var SiteId=req.query.SiteId;
		 
 		db.SiteSensorTransaction.find({EnterpriseCode:EntCode,SiteId:SiteId,AYN:"Y"},function(err,docs){
			if(err){
				res.send(err)
			}
			if(docs){				 
				res.send(docs);			
			}			 		
		})
	}
	catch(ee){
		ErrorLog("==> Error in GetNodemacIdBySiteId \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})
app.get('/GetSectionMasterTrxbySiteId',function(req,res){
	try{
		var EntCode=req.query.EntCode;
        var SiteId=req.query.SiteId;
		 
 		db.SectionMasterTransaction.find({EnterpriseCode:EntCode,SiteId:SiteId,AYN:"Y"},function(err,docs){
			if(err){
				res.send(err)
			}
			if(docs){				 
				res.send(docs);			
			}			 		
		})
	}
	catch(ee){
		ErrorLog("==> Error in GetSectionMasterTrxbySiteId \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})
app.get('/GetSitesSenosrsLiveData',function(req,res){
	try{
		 
 		//var nodeId = req.query.NodeMacId;
 		//var sensorid = req.query.SensId;
        var EntCode=req.query.EntCode;
        var SiteId=req.query.SiteId;
        
        var FinalSensArr=[];

        db.SiteSensorTransaction.find({EnterpriseCode:EntCode,SiteId:SiteId,AYN:"Y"},function(SiteErr,SiteRes){

          if(SiteErr){

          }else if(SiteRes){
            
              // console.log(SiteRes)
              sitehistorydata(SiteRes, function(err, sensorFinalData) {
		           //console.log("-------------")
		           res.send(sensorFinalData)
		        }) 


 		  }
 		}) 		  
	}
	catch(ee){
		ErrorLog("==> Error in GetSitesSenosrsLiveData \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})



apiRoutes.get('/GetNodeHistoryDataForEnergy',function(req,res){
	try{
		 
       var docs={};
		 docs['vFromDate'] = parseInt(req.query.FromDate/1000);   
 		docs['vToDate'] = parseInt(req.query.ToDate/1000);		
 		docs ['nodeId']= req.query.NodeMacId;
  		docs['sensorid'] = (req.query.SensId).split(",");

 
 	    

asyncNodeHistoryDataForEnergy(docs, function(err, sensorFinalData) {
		           //console.log("-------------")
		           res.send(sensorFinalData)
		    }) 
 	   
	}
     catch(ee){
		ErrorLog("==> Error in GetNodeHistoryDataForEnergy \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
  }

})

app.get('/GetNodeHistoryDataForEnergyUG',function(req,res){
	try{
		 
       var docs={};
		 docs['vFromDate'] = parseInt(req.query.FromDate/1000);   
 		docs['vToDate'] = parseInt(req.query.ToDate/1000);		
 		docs ['nodeId']= req.query.NodeMacId;
  		docs['sensorid'] = (req.query.SensId).split(",");

 
 	    

asyncNodeHistoryDataForEnergy(docs, function(err, sensorFinalData) {
		           //console.log("-------------")
		           res.send(sensorFinalData)
		    }) 
 	   
	}
     catch(ee){
		ErrorLog("==> Error in GetNodeHistoryDataForEnergyUG \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
  }

})

function ErrorLog(ErrMsg) {
	var d = new Date(),month = '' + (d.getMonth() + 1),day = '' + d.getDate(),year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;
	var currDate = day + "" + month + "" + year;

	var fileName = "Indriyn_Login_Service_Error_Log_" + currDate + ".txt";
	var folderName = "/home/indriyn/ErrorLog" + fileName;

	err_fs.appendFile(folderName, ErrMsg, function(err) {
	    if (err) {
	        console.log("Creating file faild.....");
	    }
	});
}

app.options('/*', function(req, res) {
    res.status(204).end();
})


function getEachRecordValue(devicebyUserdocs, callback) {
  		var finalresult = [];
  	var iteratorFcn = function(docs, done) {
  		//console.log(docs)
		  /*if (!docs.node) {
    		  done();
      		  return;
    		}*/
    		var senscode = "node."+docs;  		 
       		 var senscode1="$"+senscode;
			var query1 =  {};
 			var query2={};
 			var query1_1={} 
 			var query3={}
 			query3['$group']={_id: {"sensorId":docs},totalAmount: { $sum:senscode1}}
 			query1["node.nid"]=devicebyUserdocs['nodenid'];
 			query1[senscode]={$ne:"NULL",$exists:true};
 			query1['node.udt']={$gte:parseInt(devicebyUserdocs['startTime']/1000),$lt:parseInt(devicebyUserdocs['endTime']/1000)};
 			query1_1['$match']=query1
 			query2['$unwind']="$node";
 			//console.log(query3)
 			 		//	console.log(query2)
 			//console.log(query1_1)

 
		db.DeviceData.aggregate([query1_1,query2,query3], function(resError,Response) {
			//console.log(Response)
        	  if (resError) {
							done();
        				    return;
			 		 } else {
			 		 	    finalresult.push(Response[0])
			  				done();
            				return;
             		}
			});
	 		
		}

  	var doneIteratingFcn = function(err) {
    	callback(err, finalresult);
  	};
  async.forEach(devicebyUserdocs['sensorid'], iteratorFcn, doneIteratingFcn);
}


function asyncNodeHistoryDataForEnergy(devicebyUserdocs, callback) {
  		var finalresult = [];
  	var iteratorFcn = function(SensorId, done) {
  		//console.log(SensorId)
  			MongoClient.connect(url, function(err, mondb) {
 				var collection = mondb.collection('DeviceData');
 				var senscode = "node."+SensorId;  						 
 				var query1 ={"node.nid":devicebyUserdocs['nodeId'],"node.udt":{$gte:devicebyUserdocs['vFromDate'],$lt:devicebyUserdocs['vToDate']}}; //"gid":gatewayId, 
 				var query2={};  //senscode:1,"node.udt":1
 				query2[senscode]=1;
 				query2['node.udt']=1;
 			 
 				collection.find(query1,query2).sort({"node.udt":1}).toArray(function(err, docs) { 
                
               		if (err) {
							done();
        				    return;
			 		 } else {
			 		 	   if(docs.length>0){
			 		 	   	docs[0].SensId=SensorId;
			 		 	   	finalresult.push(docs)
			  				done();
            				return;
			 		 	   }
			 		 	    
             		}
 			  	
				
			}); 
 		}) 
		}

  	var doneIteratingFcn = function(err) {
    	callback(err, finalresult);
  	};
  async.forEach(devicebyUserdocs['sensorid'], iteratorFcn, doneIteratingFcn);
}

function sitehistorydata(devicebyUserdocs, callback){
	var finalresult = [];
  	var iteratorFcn = function(SiteRes, done) {
  		  //console.log(SensorId)
  		  var objResponseData={};
          var nodeId=SiteRes.NodeMacid;
          var sensorid=SiteRes.SensorName;
        //console.log(nodeId+"  "+sensorid)
 		db.NodeConfigMaster.find({MACId : nodeId},{Sensors:{$elemMatch:{"SensorName" : sensorid}}},function(nodeErr,nodeResp){
 				  
	 			if(nodeErr){

	 			}
	 			else if(nodeResp){

	 				//console.log(nodeResp)
	 				db.DeviceData.find({node:{$elemMatch:{"nid" : nodeId}}}).sort({_id:-1}).limit(1,function(liveErr,liveReps){
	 					 
	 					if(liveErr){
	 						done();
            				return;

	 					}
	 					else if(liveReps){	 						 
	 						
	 						objResponseData.SensSettings=nodeResp[0];
	 						objResponseData.SensLiveData=liveReps[0];
                            finalresult.push(objResponseData)
                            done();
            				return;
						 }
	 				})
	 			}
	 		 
 		      }) 
		}

  	var doneIteratingFcn = function(err) {
    	callback(err, finalresult);
  	};
  async.forEach(devicebyUserdocs, iteratorFcn, doneIteratingFcn);
}

app.get('/GetAllSitesByUsersMap',function(req,res){
	try{
		var EnterpriseCode = req.query.EntCode;
        var UserCode = req.query.UserCode;

        //console.log(UserCode) 		
		 
 		db.SiteUserMapTransaction.find({"EnterpriseCode":EnterpriseCode,"UserCode":UserCode,AYN:"Y"},function(err,docs){
			if(err){
				res.send(err)
			}
			if(docs){				 
				res.send(docs);			
			}			 		
		})
	}
	catch(ee){
		ErrorLog("==> Error in GetAllSitesByUsersMap \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

app.get('/GetSectionsBySiteId',function(req,res){
	try{
	            var EntCode=req.query.EntCode;
                var SiteId=req.query.SiteId;
                var stDate=parseInt(req.query.StartDate);
                var enDate=parseInt(req.query.EndDate);
                var FinalRetrunObj={};
                var FinalRetrunArr=[];

                db.SectionMasterTransaction.find({EnterpriseCode:EntCode,SiteId:SiteId,AYN:"Y"},function(err,docs){
                        if(err){
                                res.send(err)
                           }
                        if(docs){ 
                              db.SchedulerResults.find({SiteID:SiteId,"udt":{"$gte":stDate,"$lt":enDate}},function(err1,docs1){
                                        if(err1){
                                                res.send(err1)
                                        }
                                        if(docs1){
                                                FinalRetrunObj.SectionData=docs;
                                                FinalRetrunObj.ScheduleData=docs1;
                                                FinalRetrunArr.push(FinalRetrunObj);
                                                res.send(FinalRetrunArr); 
                                        }
                                }) 
                        }
                })
	   }
	    catch(ee){
		ErrorLog("==> Error in GetSectionsBySiteId \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

app.get('/getLatestPowerConsump',function(req,res){
        try{
                var NodemacId=req.query.NodemacId;
                 
                db.DeviceData.find({"node.nid":NodemacId}).sort({_id:-1}).limit(1,function(err,docs){
                        if(err){
                                 console.log("error in getLatestPowerConsump :"+err)
                        }else if(docs){
                                res.send(docs);
                        }
                 })
        }catch(ee){
		ErrorLog("==> Error in getLatestPowerConsump \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
});

apiRoutes.get('/GetTenantBySiteId',function(req,res){
	try{
		var EntCode=req.query.EntCode;
		var Siteid=req.query.SiteId;
         
 		db.TenantMaster.find({EnterpriseCode:EntCode,SiteId:Siteid,AYN:"Y"},function(err,docs){
			if(err){
				res.send(err)
			}
			if(docs){				 
				res.send(docs);			
			}			 		
		})
	}
	catch(ee){
		ErrorLog("==> Error in GetTenantBySiteId \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

app.get('/GetEMSDashboardSensCal',function(req,res){
	try{
		 
		        var EntCode=req.query.EntCode;
		        var SiteId=req.query.SiteId; 
		     db.ems_Dashboard_Sen_Cal.find({siteCode:SiteId}).sort({_id:-1}).limit(1,function(siteErr,siteReps){
	 					 
	 					if(siteErr){
	 						 console.log(siteErr); 						 
	 					}
	 					else if(siteReps){
                           res.send(siteReps);	 						 
						 }
	 				  })

 		  
	}
	catch(ee){
		ErrorLog("==> Error in GetEMSDashboardSensCal \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})

app.get('/GetSectionsBySiteIdForPM',function(req,res){
	try{
	            var EntCode=req.query.EntCode;
                var SiteId=req.query.SiteId;
                var stDate=parseInt(req.query.StartDate);
                var enDate=parseInt(req.query.EndDate);
                var FinalRetrunObj={};
                var FinalRetrunArr=[];

                db.SectionMasterTransaction.find({EnterpriseCode:EntCode,SiteId:SiteId,AYN:"Y"},function(err,docs){
                        if(err){
                                res.send(err)
                           }
                        if(docs){ 
                                var len=docs.length;
                        	 db.sectionDashboradCal.find({enterpriseCode:EntCode,siteId:SiteId,currentState:{$ne:"NULL"}}).sort({"_id":-1}).limit(len,function(err1,docs1){
                                        if(err1){
                                                res.send(err1)
                                        }
                                        if(docs1){
                                                FinalRetrunObj.SectionData=docs;
                                                FinalRetrunObj.SectionCal=docs1;
                                                FinalRetrunArr.push(FinalRetrunObj);
                                                res.send(FinalRetrunArr); 
                                        }
                                })
                               
                        }
                })
	   }
	    catch(ee){
		ErrorLog("==> Error in GetSectionsBySiteIdForPM \r\n \r\t==>Error Message = "+ee+" on @ "+new Date()+"\r\n");
	}
})
