import React from 'react'
import './App.css'
// import Home from './Components/Home/Home'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import CategoryServeur from './Components/CategoryServeur/CategoryServeur';
import CategoryApplication from './Components/CategoryApplication/CategoryApplication';
import Navbar from './Components/Navbar/Navbar';

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
      <Route path="/CategoryServeur" element={<CategoryServeur/>} />
      <Route path="/CategoryApplication" element={<CategoryApplication/>} />

       
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
