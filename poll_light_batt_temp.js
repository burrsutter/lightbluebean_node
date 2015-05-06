// only looks for 78a50449b65c

var Bean = require('ble-bean');

Bean.discover(function(bean){
  console.log('discovered: ', bean);
  if(bean.uuid ==="d03972c91fb6") {
      console.log("Found light, batt, temp bean");
    
      var pollForData = function() {
    
        bean.connectAndSetup(function() {
            console.log("connectAndSetup");
            
            bean.notifyFive(
            //called when there is data
            function(data){
            console.log("notifyFive Light");
              if(data && data.length>=2){
                var value0 = data[0];
                console.log("value0: " + value0);
                var value1 = data[1]<<8;
                console.log("value1: " + value1);
                
              }
            },
            //called when the notify is successfully or unsuccessfully setup
            function(error){
              if(error) console.log("one setup: ", error);
            }); // bean.notifyOne(

            bean.notifyTwo(
            //called when there is data
            function(data){
              // console.log("notifyTwo Battery");
              if(data && data.length>=2){
                var value0 = data[0];
                // console.log("value0: " + value0);
                var value1 = data[1]<<8;
                // console.log("value1: " + value1); // holds batt voltage
              }
            },
            //called when the notify is successfully or unsuccessfully setup
            function(error){
              if(error) console.log("one setup: ", error);
            }); // bean.notifyTwo(

            bean.notifyThree(
            //called when there is data
            function(data){
              // console.log("notifyThree Temp");
              if(data && data.length>=2){
                var value0 = data[0];
                // console.log("value0: " + value0); // holds celsius value
                var value1 = data[1]<<8;
                // console.log("value1: " + value1);
              }
            },
            //called when the notify is successfully or unsuccessfully setup
            function(error){
              if(error) console.log("one setup: ", error);
            }); // bean.notifyThree(

            
        }); // bean.connectAndSetup 
    
      }; // pollForData
    
    // poll for sensor data every 10 secs
    intervalId = setInterval(pollForData,10000);
    
  } else {
   console.log("Not Light, Batt, Temp Bean");
   process.exit(0);     
  }
});