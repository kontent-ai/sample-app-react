import React from 'react';
import { Link } from 'react-router-dom';

const LowerCaseUrlLink = props => {
  if (/^https?:\/\//.test(props.to) || /^mailto:/.test(props.to)) {
    return (
      <a href={props.to.toLowerCase()} {...props}>
        {props.children}
      </a>
    );
  }
  return <Link {...props} to={props.to.toLowerCase()} />;
};

export default LowerCaseUrlLink;
