var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://192.168.3.2');

client.subscribe('lbb_click');

client.on('message', function (topic, message) {
 console.log(message.toString());
});

