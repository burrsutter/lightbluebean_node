var Bean = require('ble-bean');
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://192.168.3.2');
var connectedBean;
var intervalId;

var pollForData = function() {
  Bean.discover(function(bean){
    
    console.log('uuid: ', bean.uuid);
    console.log('count: ', bean.count);
    console.log('name: ', bean._peripheral.advertisement.localName);
    // console.log('bean: ', bean);
  });
}

intervalId = setInterval(pollForData,1000);

