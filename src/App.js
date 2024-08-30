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
import ServeurApplication from "./Components/ServeurApplication/ServeurApplication";


import Navbar from './Components/Navbar/Navbar';
import Serveur from './Components/Serveur/Serveur';
import SousReseau from './Components/SousReseau/SousReseau';
import Reseau from './Components/Reseau/Reseau';

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
      <Route path="/ServeurApplication" element={<ServeurApplication/>} />
      <Route path="/Serveur" element={<Serveur/>} />
      <Route path="/SousReseau" element={<SousReseau/>} />
      <Route path="/Reseau" element={<Reseau/>} />


       
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
