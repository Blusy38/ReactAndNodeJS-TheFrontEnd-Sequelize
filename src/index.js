import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter } from 'react-router-dom';
import Products from '../src/Containers/Products/Products';
import Users from '../src/Containers/Users/Users';
import Home from './Containers/Home';
import MyNavBar from './Containers/Navbar';

ReactDOM.render(
  <BrowserRouter>
    <Route path='/' component={MyNavBar} />
    <Route path='/home/' component={Home} />
    <Route path='/users/' component={Users} />
    <Route path='/products/' component={Products} />
  </BrowserRouter>
  ,
  document.getElementById('root')
);
