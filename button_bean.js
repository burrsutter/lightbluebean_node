// https://www.npmjs.com/package/ble-bean
/*
Only connect to the button bean
and read its clicks via scratch one
then sends message via MQTT
*/

var mqtt = require('mqtt');
var Bean = require('ble-bean');
var clickCount = 0;

var client = mqtt.connect('mqtt://192.168.3.5', function(error) {
  console.log("error: " + error);
});

Bean.discover(function(bean){
  // console.log('discovered: ', bean);
  console.log("bean uuid", bean.uuid);

  if(bean.uuid === "b4994c1ec0c8") {
    console.log("button bean");
    bean.connectAndSetup(function() {
      console.log('button bean connected');

      bean.notifyOne(
        //called when there is data
        function(data){
          if(data && data.length>=2){
            var value = data[1]<<8 || (data[0]);
             if (value === 1) {
               clickCount+=1;
               console.log("clicked:", value);
               client.publish("lbb_click",clickCount);
             }
          }
        },
      //called when the notify is successfully or unsuccessfully setup
      function(error){
        if(error) console.log("one setup: ", error);
      });

    }); // bean.connectAndSetup
  } else {
   console.log("Not Button Bean");
   process.exit(0);
  } 
}); // Bean.discover

