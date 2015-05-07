var Bean = require('ble-bean');
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://192.168.3.2');
// var connectedBean;
var intervalBean;
var intervalData;

var pollForBean = function() {
	
  Bean.discover(function(bean){
    // console.log('bean: ', bean); 
    connectedBean = bean; // connectedBean local to the discover function

    connectedBean.on("temp", function(temp, valid){
      // var status = valid ? "valid" : "invalid";
      process.stdout.write("uuid: " + connectedBean.uuid);
      process.stdout.write("\tname: " + connectedBean._peripheral.advertisement.localName);
      process.stdout.write("\ttemp:" + temp + "\n");
    }); // on temp

    connectedBean.connectAndSetup(function() {
      // console.log("connectedBean: connectAndSetup");

      var pollForData = function() {
        connectedBean.requestTemp( function(){
          // console.log("request temp sent");
        });
      } // pollForData
      intervalData = setInterval(pollForData,5000);

    }); // connectAndSetup
  }); // discover

} // pollForBean

intervalBean = setInterval(pollForBean,5000);


