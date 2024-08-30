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
import Site from "./Components/Site/Site";
import Application from "./Components/Application/Application";
import ClusterApplication from "./Components/ClusterApplication/ClusterApplication";
import Cluster from "./Components/Cluster/Cluster";
import Navbar from './Components/Navbar/Navbar';

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
      <Route path="/CategoryServeur" element={<CategoryServeur/>} />
      <Route path="/CategoryApplication" element={<CategoryApplication/>} />
      <Route path="/site" element={<Site/>} />
      <Route path="/application" element={<Application/>} />
      <Route path="/clusterApplication" element={<ClusterApplication/>} />
      <Route path="/cluster" element={<Cluster/>} />


       
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
