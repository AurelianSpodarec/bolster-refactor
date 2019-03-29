import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const InviteCompanyForm = ({ location }) => (
    <div className="content-area size-lg-12">
        <h1 className="heading heading-3">Invite Company</h1>
        <Link
            className="button"
            to={location.pathname.replace('/invite-company', '')}
        >
            Cancel
        </Link>
        <Link
            className="button"
            to={location.pathname.replace('/invite-company', '')}
        >
            Save
        </Link>
    </div>
);

export default withRouter(InviteCompanyForm);
