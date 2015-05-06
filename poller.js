var Bean = require('ble-bean');
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://192.168.3.2');
var connectedBean;
var intervalId;

var pollForData = function() {
  Bean.discover(function(bean){
    
    console.log('uuid: ', bean.uuid);
    console.log('name: ', bean._peripheral.advertisement.localName);
    // console.log('bean: ', bean);
    
  });
}
// question, can I discover, connectAndSetup, grab the temp and disconnect
// awaiting for next polling interval?
intervalId = setInterval(pollForData,1000);

