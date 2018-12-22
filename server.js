const serial = require('serialport');
const mqtt = require('mqtt');
const Readline = serial.parsers.Readline;

var mqtt_client = mqtt.connect('mqtt://192.168.2.5');

var serial_port = new serial('/dev/ttyUSB0', {
  baudRate: 115200
});

const parser = new Readline();
serial_port.pipe(parser);

var telegram = '';

serial_port.on('open', showPortOpen);
parser.on('data', publishData);
serial_port.on('error', publishError);
serial_port.on('disconnect', handleDisconnect);

function showPortOpen() {
  console.log('port open.');
}

function publishData(data) {

  if (data.startsWith('/')) {
    telegram = '';
    telegram += data + '\n';
  } else if (!data.startsWith('!')) {
        telegram += data + '\n';
  } else {
        telegram += data + '\n';
        mqtt_client.publish('smartmeter/reading', telegram, {qos:1});
 }
}

function publishError(error) {
  console.log(error);
}

// just print an error
function handleDisconnect() {
  console.log('Serial port disconnected');
}
