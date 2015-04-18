// https://www.npmjs.com/package/ble-bean

var Bean = require('ble-bean');
Bean.discover(function(bean){
  console.log('discovered: ', bean);

  bean.on("serial", function(data, valid){
    console.log(data.toString());
  });

  bean.connectAndSetup(function() {
    console.log('connected');

    // trying to write something to bean
    var buffer = new Buffer(1);
    buffer.write("2");
    bean.writeOne(buffer, 
      function() {
        console.log("buffer: " + buffer);
      } 
    );

  }); // bean.connectAndSetup
}); // Bean.discover

