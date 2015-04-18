// https://www.npmjs.com/package/ble-bean

var Bean = require('ble-bean');
Bean.discover(function(bean){
  console.log('discovered: ', bean);

  bean.on("serial", function(data, valid){
    var status = valid ? "valid" : "invalid";
    console.log("received " + status + " data:\t" + data);
  });


  bean.connectAndSetup(function() {
    console.log('connected');

    bean.notifyOne(
      //called when theres data
      function(data){
        if(data && data.length>=2){
          var value = data[1]<<8 || (data[0]);
          if(value === 1) {
             console.log("one:", value);
          } 
        }
      },
      //called when the notify is successfully or unsuccessfully setup
      function(error){
        if(error) console.log("one setup: ", error);
      });


  });
});

