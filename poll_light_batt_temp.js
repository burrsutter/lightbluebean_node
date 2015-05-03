// only looks for 78a50449b65c

var Bean = require('ble-bean');

Bean.discover(function(bean){
  console.log('discovered: ', bean);
  if(bean.uuid ==="78a50449b65c") {
      console.log("Found light, batt, temp bean");
    
      var pollForData = function() {
    
        bean.connectAndSetup(function() {
            console.log("connectAndSetup");
            
            bean.notifyOne(
            //called when there is data
            function(data){
            console.log("notifyOne");
              if(data && data.length>=2){
                var value = data[1]<<8 || (data[0]);
                console.log("data: " + data);
              }
            },
            //called when the notify is successfully or unsuccessfully setup
            function(error){
              if(error) console.log("one setup: ", error);
            }); // bean.notifyOne(
            
        }); // bean.connectAndSetup 
    
      }; // pollForData
    
    // poll for sensor data every 10 secs
    intervalId = setInterval(pollForData,10000);
    
  } else {
   console.log("Not Light, Batt, Temp Bean");
   process.exit(0);     
  }
});