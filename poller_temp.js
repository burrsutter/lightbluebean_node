var Bean = require('ble-bean');
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://192.168.3.2');

var intervalBean;
var intervalData;

	
  Bean.discover(function(bean){
    // console.log('bean: ', bean); 

    bean.on("temp", function(temp, valid){
      if (valid) {
        process.stdout.write("uuid: " + bean.uuid);
        process.stdout.write("\tname: " + bean._peripheral.advertisement.localName);
        process.stdout.write("\ttemp:" + temp + "\n");
      }
    }); // on temp

    bean.connectAndSetup(function() {
      // console.log("bean: connectAndSetup");

      var pollForData = function() {
        bean.requestTemp( function(){
          // console.log("request temp sent");
        });
      } // pollForData

      intervalData = setInterval(pollForData,5000);

    }); // connectAndSetup
  }); // discover






