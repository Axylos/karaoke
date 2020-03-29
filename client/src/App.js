import React, {useEffect} from 'react';
import logo from './logo.svg';
import { mountVid, call, send, makeFoo, connectFoo } from './svc'
import './App.css';

function App() {
  useEffect(mountVid);
  return (
    <div className="App">
      <h1>hey there</h1>
      <div>
        <video id="me"></video>
      </div>
      <div>
        <video id="you"></video>
      </div>
      <button onClick={makeFoo}>make a conn</button>
      <button onClick={connectFoo}>connect to first</button>
      <form onSubmit={(e) => send(e)}>
        <input name="query" type="text" />
        <button type="submit">submit</button>
      </form>
      <button onClick={() => call()}>call</button>
    </div>
  );
}

export default App;
