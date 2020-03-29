const express = require('express');
const logger = require('morgan');
const { ExpressPeerServer } = require('peer'); 

const app = express();
app.use(logger('dev'));
const server = app.listen(9001);

const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/'
});

peerServer.on('connection', (client) => {
  console.log('got a conn');
  console.log(client);
  client.send('open conn');
});

app.use('/karaoke-api', peerServer);
