import Peer from 'peerjs'
const config = {
  host: 'draketalley.com',
  path: '/karaoke-api'
}
let peer;
let handle;
let localStream;
export const mountVid = () => {
  const me = document.querySelector('#me');
  navigator.getUserMedia({video: true, audio: true}, (stream) => {
    me.srcObject = stream;
    me.muted = true;
    me.play();
    localStream = stream;
  });
  return null;
}
export const makeFoo = () => {
  peer = new Peer('first', config);

  peer.on('connection', (conn) => {
    handle = conn;
    conn.on('data', (data) => {
      console.log(data);
    });

    conn.on('open', () => {
      conn.send('hello');
    }); 

  });
  peer.on('call', (call) => {
    call.answer(localStream);

    call.on('stream', (stream) => {

const partner = document.querySelector('#you');
      partner.srcObject = stream;
      //partner.muted = true;
      partner.play();
    })
  });
};

export const call = () => {
  peer = new Peer('second', config);
  const x = peer.call('first', localStream);
  x.on('stream', (otherStream) => {
const partner = document.querySelector('#you');
    partner.srcObject = otherStream;
    partner.play();
  });
}
export const send = (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  const txt = form.get('query');
  handle.send(txt);
}
export const connectFoo = () => {
  peer = new Peer('second', config);
  const conn = peer.connect('first');
  handle = conn;
  conn.on('open', () => {
    conn.send('hi');
  });
};



