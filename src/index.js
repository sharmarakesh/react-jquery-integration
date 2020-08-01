import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import MyjQueryReactComponent from './MyjQueryReactComponent';
import * as $ from 'jquery';
import MyjQueryReactComponentWithUIHelper from './MyjQueryReactComponentWithUIHelper';

const UIHelper = {
  getBgColor: function (parent, callbackfn) {
    callbackfn($('#elm').css('background-color'), parent);
  },
  setBgColor: function (color) {
    $('#elm').css('background-color', color);
  },
  getTextColor: function (parent, callbackfn) {
    callbackfn($('#elm').css('color'), parent);
  },
  setTextColor: function (color) {
    $('#elm').css('color', color);
  },
};

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <>
    <MyjQueryReactComponent
      context={$('body')}
      jqueryContext={$}
      now={new Date()}
    />
    <MyjQueryReactComponentWithUIHelper context={UIHelper} />
  </>,
  document.getElementById('root')
);

// ReactDOM.render(
//   React.createElement(MyjQueryReactComponent, { context: $('body') }),
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
