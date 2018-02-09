import React, { Component } from 'react';

import Article from './Components/ArticleContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Article codeName="on_roasts" />
      </div>
    );
  }
}

export default App;
