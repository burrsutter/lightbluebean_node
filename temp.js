// https://www.npmjs.com/package/ble-bean

var Bean = require('ble-bean');
Bean.discover(function(bean){
  console.log('discovered: ', bean);

  bean.on("temp", function(temp, valid){
    var status = valid ? "valid" : "invalid";
    // console.log("received " + status + " temp:\t" + temp);
    console.log("temp=%d", temp.toFixed(1));
  });

/*
  bean.on("accell", function(x, y, z, valid){
    var status = valid ? "valid" : "invalid";
    console.log("received " + status + " accell\tx:\t" + x + "\ty:\t" + y + "\tz:\t" + z );
  });
*/

  bean.connectAndSetup(function() {
    console.log('connected');

    var readData = function() {
/*
      bean.requestAccell(
      function(){
        console.log("request accell sent");
      });
*/
      bean.requestTemp(
      function(){
//        console.log("request temp sent");
      });
    }
    // poll for sensor data every 1000
    intervalId = setInterval(readData,1000);
  });
});

