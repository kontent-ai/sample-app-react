import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Query = gql`
  query($articleCodeName: String!) {
    article (search: $articleCodeName)
      @rest(path: "items/:search") {
      item 
    }
  }
`;

class Article extends Component {
  render() {
    const { data: { loading, error, item } } = this.props;
    if (loading) {
      return <h4>Loading...</h4>;
    }
    if (error) {
      return <h4>{error.message}</h4>;
    }
    debugger;
    return (
      <div>
        <h1>DATA!!!</h1>
      </div>
    );
  }
}

const ArticleWithData = graphql(Query, {
  options: ({ articleCodeName }) => {
    return { variables: { articleCodeName } };
  },
})(Article);


export default ArticleWithData;
