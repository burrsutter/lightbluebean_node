var Bean = require('ble-bean');
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://192.168.3.2');
// var connectedBean;
var intervalBean;
var intervalData;

var pollForBean = function() {
	
  Bean.discover(function(bean){
    // console.log('bean: ', bean); 
    // connectedBean = bean; // connectedBean local to the discover function

    bean.on("temp", function(temp, valid){
      // var status = valid ? "valid" : "invalid";
      // console.log(valid);
      if (valid) {
        process.stdout.write("uuid: " + bean.uuid);
        process.stdout.write("\tname: " + bean._peripheral.advertisement.localName);
        process.stdout.write("\ttemp:" + temp + "\n");
        bean.disconnect();
        // do I need both these lines?
        setTimeout(bean.disconnect.bind(bean, function(){}), 2000);
      }
    }); // on temp

    bean.connectAndSetup(function() {
      // console.log("connectedBean: connectAndSetup");

      var pollForData = function() {
        bean.requestTemp( function(){
          // console.log("request temp sent");
        });
      } // pollForData
      intervalData = setInterval(pollForData,5000);

    }); // connectAndSetup
  }); // discover

} // pollForBean

intervalBean = setInterval(pollForBean,5000);


