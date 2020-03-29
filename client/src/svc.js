import Peer from 'peerjs'
const config = {
  host: 'draketalley.com',
  path: '/karaoke-api',
  secure: true,
  'iceServers': [{ 'urls': ['stun:stun.l.google.com:19302']  }],
  debug: 3
}
let peer;
let handle;
let localStream;
const first = "FIRST";
const second = "SECOND";
export const mountVid = () => {

  const me = document.querySelector('#me');
  navigator.getUserMedia({video: true}, (stream) => {
    me.srcObject = stream;
    me.muted = true;
    me.play();
    localStream = stream;
  });
  return null;
}
export const makeFoo = () => {
  peer = new Peer(first, config);
  peer.on('open', () => {
    console.log('open');
  }); 
  peer.on('error', err => console.log('first err: ', err));
  peer.on('close', () => console.log('peer destroyed'));
  peer.on('disconnected', () => console.log('disconnected'));

  peer.on('connection', (conn) => {
    handle = conn;
    console.log('connection');
    conn.on('data', (data) => {
      console.log(data);
    });
    conn.on('open', () => console.log('opening'));


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
  peer = new Peer(second, config);
  const x = peer.call(first, localStream);
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
  console.log(txt);
  handle.send(txt);
}
export const connectFoo = () => {
  peer = new Peer(second, config);
  peer.on('open', () => {
    console.log('open');
  });

  const conn = peer.connect(first);
  handle = conn;
  window.handle = handle;
  console.log(conn);
  conn.on('error', err => console.log('error: ', err));
  conn.on('open', () => console.log('second conn opened'));


  conn.on('data', (data) => console.log(data));
  conn.on('close', () => console.log('closed'));

  peer.on('close', () => console.log('closed peer'));
  peer.on('error', err => console.log(err));
  peer.on('disconnected', () => console.log('disconnected'));
}; 



