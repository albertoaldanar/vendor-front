// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

const sum = require('./sum');

describe("TEST", () => {

  it('adds 1 + 2 to equal 3', () => {
    console.log(sum(1, 4));
    expect(sum()).toBeDefined();
  });

})
