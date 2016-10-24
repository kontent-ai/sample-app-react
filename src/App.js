import React from 'react';
import Header from './Components/Header.js';

const App = (props) => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
}

export default App;