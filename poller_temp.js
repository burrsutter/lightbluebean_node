var Bean = require('ble-bean');
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://192.168.3.2');
var connectedBean;
var intervalId;

// question, can I discover, connectAndSetup, grab the temp and disconnect

var pollForData = function() {
  Bean.discover(function(bean){
    // console.log('bean: ', bean); 
    connectedBean = bean;    
    console.log('uuid: ', connectedBean.uuid);
    console.log('name: ', connectedBean._peripheral.advertisement.localName);

    connectedBean.on("temp", function(temp, valid){
      var status = valid ? "valid" : "invalid";
      console.log(" temp:\t" + temp);
    }); // on temp

    connectedBean.connectAndSetup(function() {
      console.log("connectedBean: connectAndSetup");
      bean.requestTemp(     function(){
        console.log("request temp sent");
      });

    }); // connectAndSetup
  }); // discover
} // pollForData
// awaiting for next polling interval?
intervalId = setInterval(pollForData,5000);

