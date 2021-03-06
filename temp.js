// https://www.npmjs.com/package/ble-bean

var Bean = require('ble-bean');
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://192.168.3.3');

Bean.discover(function(bean){
  console.log('discovered: ', bean);

  bean.on("temp", function(temp, valid){
    var status = valid ? "valid" : "invalid";
    // console.log("received " + status + " temp:\t" + temp);
    console.log("temp=%d", temp.toFixed(1));
    client.publish("lbb_temp",temp.toFixed(1));
  });


  bean.connectAndSetup(function() {
    console.log('connected');

    var readData = function() {
      bean.requestTemp(
      function(){
//        console.log("request temp sent");
      });
    }
    // poll for sensor data every 1000
    intervalId = setInterval(readData,1000);
  });
});

