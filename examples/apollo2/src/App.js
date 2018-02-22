import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { RestLink } from 'apollo-link-rest';
import Article from './Components/Article';

const restLink = new RestLink({
  uri: 'https://deliver.kenticocloud.com/975bf280-fd91-488c-994c-2f04416e5ee3/',
});

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Apollo Rest Link Example</h1>
        </header>
        <Article articleCodeName="coffee_processing_techniques"/>
      </div>
    );
  }
}

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default ApolloApp;
