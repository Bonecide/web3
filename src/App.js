import './App.css';
import { Fragment, useEffect, useState } from 'react';
import Web3 from 'web3';
import WebTest from './components/Web3/WebTest';
import Ton from './components/Ton/Ton';
import { Route, Routes } from 'react-router-dom';
import Side from './components/Side/Side';
function App() {
  return (
    // <div className='MAIN' >
    //  {/* <WebTest/> */}
    //  <Ton/>
    // </div>
    <>
    <Side/>
    <Routes>
      
      <Route index element={<WebTest/>}/>
      <Route path='/ton' element ={<Ton/>}/>
    </Routes>
    </>

  );
}

export default App;
