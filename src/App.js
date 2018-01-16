import React from 'react';
import Header from './Components/Header.js';
import Footer from './Components/Footer.js';

const App = props => {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

export default App;
