import './App.scss';
import React from 'react';
import Routes from './routes/routes'
import { BrowserRouter } from 'react-router-dom';
import Header from './components/shared/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
