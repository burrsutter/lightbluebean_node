Hacking on Lightblue Beans + Intel Edison (or Raspberry Pi)
Leverages the ble-bean NPM

The LBB has an accelerometer, temp sensor, RGB LED and is programmable


The Button Bean (has a physical button soldered on), sets its scratch data 
which is read by the Node.js app (button_bean.js) and a click message is sent over MQTT

The Servo Bean (servo_bean.js), will subscribe to click messages via MQTT
and will eventually attempt to animate a servo.


