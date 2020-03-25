import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import router from './route'
// import Count from './count';


const App = () => {

  return (
    <BrowserRouter>
      {router}
    </BrowserRouter>
  );
}

export default App;
