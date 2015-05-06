var Bean = require('ble-bean');
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://192.168.3.2');
var connectedBean;
var intervalId;

  Bean.discover(function(bean){
    // console.log('bean: ', bean); 
    connectedBean = bean;
    process.stdout.write("uuid: ", connectedBean.uuid);
    process.stdout.write("\tname:", connectedBean._peripheral.advertisement.localName);

    connectedBean.on("temp", function(temp, valid){
      var status = valid ? "valid" : "invalid";
      process.stdout.write("\ttemp:\t" + temp);
    }); // on temp

    connectedBean.connectAndSetup(function() {
      // console.log("connectedBean: connectAndSetup");
      var pollForData = function() {
        bean.requestTemp(     function(){
          // console.log("request temp sent");
        });
      } // pollForData
      intervalId = setInterval(pollForData,5000);

    }); // connectAndSetup
  }); // discover


