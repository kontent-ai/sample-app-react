import React from 'react';
const SpinnerBox = props => (
  <div className="spinner-box kk-container">
    <span className="spinner" />
    <span className="spinner-message">{props.message}</span>
  </div>
);

export default SpinnerBox;
