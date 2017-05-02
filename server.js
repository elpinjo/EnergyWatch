var express = require('express');
var app = express();
var mqtt = require('mqtt')
var serial = require('serialport')
var mqtt_client  = mqtt.connect('mqtt://192.168.2.5')

var serial_port = new SerialPort("/dev/ttyUSB0", {
  baudRate: 115200
});

var Readline = SerialPort.parsers.Readline;
var serialParser = new Readline();

serial_port.pipe(serialParser);
serialParser.on('data', console.log);

/*
mqtt_client.on('connect', () => {
  mqtt_client.publish('presence/smartmeter', 'Smart Energy meter')
})
 
mqtt_client.on('message', (topic, message) => {
  // message is Buffer 
  console.log(message.toString());
})

// reply to request with "Hello World!"
app.get('/', function (req, res) {
  res.send('Hello World!');
});
*/
//start a server on port 80 and log its start to our console
var server = app.listen(80, function () {
	
  var port = server.address().port;
  console.log('Example app listening on port ', port);

});
