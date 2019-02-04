var mqtt = require('mqtt');
var mongojs = require('mongojs');
var bodyparser=require('body-parser');
var db = mongojs('indriyn:1qaz2WSX@13.84.168.39/EMS_IOT', ['LiveNodeData']);
//indriyn:1qaz2WSX@localhost/
var ObjectId=mongojs.ObjectId;
var options = {
    username: 'indriyn',
    password: '1qaz2WSX'
};


var  socketio = require('socket.io');
var mqtts = mqtt.connect("mqtt://13.84.168.39",options);


mqtts.on('connect',function () {
 console.log("Connected to mqtt");
  mqtts.subscribe('EMSDAT');
});
mqtts.on('message',function (topic,message) {
	try{
			  var outputdata=JSON.parse(message);
	  var d1 = new Date ();
	  if(outputdata.node[0].udt.toString().length>10){
                     outputdata.node[0].udt=(parseInt((outputdata.node[0].udt)/1000))-(810*60);
           }
	  outputdata.node[0].cdt = new Date ( d1 );
	  db.LiveNodeData.remove({"node.nid":outputdata.node[0].nid}, function (err, docs) {
                if(err){
			console.log("error");
		}else{
			 db.LiveNodeData.insert(outputdata, function (err, docs) {
                if(err){
			console.log("error");
		}else{
		     console.log(docs);
		}
		});
	}	
   });
	   

 	}catch(e){
	 console.log(e);
   }
  
	 
	
});







 
