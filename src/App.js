import { pkg } from '@carbon/ibm-products';
import './App.css';
import './app.scss';
import React, { Component } from 'react';
import { Button, Content } from '@carbon/react';
import CarbonHeader from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './content/Dashboard';
import Home from './content/Home';
import Login from './content/Login';
import EmpPage from './content/EmpPage';
import '@carbon/ibm-products/css/index.min.css';

pkg.setAllComponents(true);
pkg.setAllFeatures(true);

class App extends Component {
  render() {
    return (
  <Content>
  <Routes>
  <Route exact path="/" element={<Login />} />
      <Route path="/home" element={<div><Home /><CarbonHeader /></div>} />
      <Route exact path="/emppage" element={<div><EmpPage /><CarbonHeader /></div>} />
      <Route exact path="/dashboard" element={<div><Dashboard /><CarbonHeader /></div>} />
  </Routes>
  </Content>
    );
  }
}

export default App;

