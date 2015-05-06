var Bean = require('ble-bean');
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://192.168.3.2');
var connectedBean;
var intervalId;

var pollForData = function() {
  Bean.discover(function(bean){
    
    console.log('discovered: ', bean.uuid);
    console.log('discovered: ', bean.rssi);
    // console.log('bean: ', bean);
    console.log('discovered: ', bean.advertisement.localName);
  });
}

intervalId = setInterval(pollForData,5000);

