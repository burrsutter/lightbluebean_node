// only looks for 78a50449b65c

var Bean = require('ble-bean');

Bean.discover(function(bean){
  console.log('discovered: ', bean);
  if(bean.uuid ==="78a50449b65c") {
	  bean.connectAndSetup(function() {
		
		
	  }); // bean.connectAndSetup	
  } else {
   console.log("Not Light, Batt, Temp Bean");
   process.exit(0);   	
  }
});