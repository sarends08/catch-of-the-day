import React from 'react';
//Other way to import:
//import { Component } from 'react';
import { render } from 'react-dom';
import Router from './components/Router';
import "./css/style.css"


render(<Router />, document.querySelector('#main'));