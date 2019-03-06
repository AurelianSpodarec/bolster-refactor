import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const CompaniesAccess = ({ location }) => (
    <div className="size-lg-12">
        <h1 className="heading heading-3 size-lg-12">Companies with access</h1>
        <Link className="button" to={`${location.pathname}/add-company`}>
            Add company
        </Link>
    </div>
);

export default withRouter(CompaniesAccess);
