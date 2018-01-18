import React from 'react';
import { Link } from 'react-router-dom'

const LowerCaseUrlLink = (props) => {
    return (
        <Link {...props} to={props.to.toLowerCase()}/>
    );
}

export default LowerCaseUrlLink;