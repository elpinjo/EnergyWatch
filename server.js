var serial = require('serialport');
var mqtt = require('mqtt');

var mqtt_client = mqtt.connect('mqtt://192.168.2.5');

var serial_port = new serial('/dev/ttyUSB0', {
  baudRate: 115200,
  parser: serial.parsers.Readline
});

var telegram = '';

serial_port.on('open', showPortOpen);
serial_port.on('data', publishData);
serial_port.on('error', publishError);
serial_port.on('disconnect', handleDisconnect);

function showPortOpen() {
  console.log('port open. data rate: ' + serial_port.options.baudRate);
}

function publishData(data) {
  if (!data.startsWith('!')) {
        telegram += data + '\n';
  } else {
        telegram += data + '\n';
        mqtt_client.publish('smartmeter/reading', telegram, {qos:1});
        telegram = '';
 }
}

function publishError(error) {
  console.log(error);
}

// just print an error
function handleDisconnect() {
  console.log('Serial port disconnected');
}
