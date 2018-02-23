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
  console.log('port open.');
}

function publishData(dataBuffer) {
  let data = '';

  if (dataBuffer instanceof Buffer) {
    data = dataBuffer.toString('ascii');
  } else {
    console.log('is dataBuffer a string?: ' + typeof dataBuffer );
    console.log('dataBuffer is not a buffer: ' + dataBuffer);
    data = dataBuffer;
  }
  if (data.startsWith('/')) {
    telegram = '';
    telegram += data;
  } else if (!data.startsWith('!')) {
        telegram += data;
  } else {
        telegram += data + '\n';
        mqtt_client.publish('smartmeter/reading', telegram, {qos:1});
 }
}

function publishError(error) {
  console.log(error);
}

function handleDisconnect() {
  console.log('Serial port disconnected');
}
