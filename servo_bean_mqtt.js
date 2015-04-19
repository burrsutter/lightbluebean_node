// https://www.npmjs.com/package/ble-bean
/*
 Writes to Scratch one of the LBB, assumes the LBB is reading via 
 ScratchData thisScratch = Bean.readScratchData(1);
*/
var Bean = require('ble-bean');
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://192.168.3.2');
var connectedBean;

client.subscribe('lbb_click');

client.on('message', function (topic, message) {
 console.log(message.toString());
 var buffer = new Buffer(1);
 buffer.write(message.toString());
 connectedBean.writeOne(buffer, 
   function() {
     console.log("buffer: " + buffer);
   }
 );

});

Bean.discover(function(bean){
  console.log('discovered: ', bean.uuid);
  connectedBean = bean;
  bean.on("serial", function(data, valid){
    console.log(data.toString());
  });

  if(bean.uuid ==="b4994c1eb8e0") {
    bean.connectAndSetup(function() {
      console.log('connected');

      // trying to write something to bean
      // var buffer = new Buffer(1);
      // buffer.write("5");
      // bean.writeOne(buffer, 
      //  function() {
      //    console.log("buffer: " + buffer);
      //  } 
      // );
    }); // bean.connectAndSetup
  } // if bean.uuid
}); // Bean.discover

