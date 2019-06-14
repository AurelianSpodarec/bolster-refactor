import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const BackButtonWithURL = ({ backURL = '' }) => (
    <Link to={backURL} className="button back">
        <i className="fa fa-chevron-double-left" /> Back
    </Link>
);

export default withRouter(BackButtonWithURL);
