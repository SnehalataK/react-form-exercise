import React from 'react';
import './App.css';

import Form from '../Form/';

function App() {
  return (
    <div className="App">
      <header data-test-attr="header-elem" className="app-header"></header>
      <div className="app-body">
        <Form data-test-attr="form-elem"/>
      </div>
      
    </div>
  );
}

export default App;
