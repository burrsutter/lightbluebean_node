// https://www.npmjs.com/package/ble-bean
/*
Only connect to the button bean
and read its clicks via scratch one
*/
var mqtt = require('mqtt');
var Bean = require('ble-bean');

var client = mqtt.connect('mqtt://192.168.3.3');

Bean.discover(function(bean){
  // console.log('discovered: ', bean);
  console.log("bean uuid", bean.uuid);

  if(bean.uuid === "b4994c1ec0c8") {
    bean.connectAndSetup(function() {
      console.log('connected');

      bean.notifyOne(
        //called when theres data
        function(data){
          if(data && data.length>=2){
            var value = data[1]<<8 || (data[0]);
            if(value === 1) {
               console.log("clicked:", value);
            } 
          }
        },
      //called when the notify is successfully or unsuccessfully setup
      function(error){
        if(error) console.log("one setup: ", error);
      });

    }); // bean.connectAndSetup
  } // if bean.uuid
}); // Bean.discover

