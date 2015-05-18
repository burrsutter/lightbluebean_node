var Bean = require('ble-bean');
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://192.168.3.2');

var intervalBean;
var intervalData;

	
  Bean.discover(function(bean){
    // console.log('bean: ', bean); 
    if(bean.uuid === "d03972c91fb6") {

      bean.on("temp", function(temp, valid){
        if (valid) {
          process.stdout.write("uuid: " + bean.uuid);
          process.stdout.write("\tname: " +
          bean._peripheral.advertisement.localName);
          process.stdout.write("\ttemp:" + temp + "\n");
          client.publish('temp_lbb_sense',
          '{"sensorid":"lbb_sense",' +
          ' "temp":' + temp.toFixed(1) + ',' +
          ' "time":' + Date.now() + '}'
          );
        }
      }); // on temp

      bean.connectAndSetup(function() {
        // console.log("bean: connectAndSetup");

        var pollForData = function() {
          bean.requestTemp( function(){
            // console.log("request temp sent");
          });
        } // pollForData

        intervalData = setInterval(pollForData,1000);

      }); // connectAndSetup
   } // if d03972c91fb6
  }); // discover
