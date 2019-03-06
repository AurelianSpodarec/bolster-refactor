import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const AttachOperativeForm = ({ location }) => (
    <div className="content-container size-lg-12">
        <div className="content-area size-lg-12">
            <h3 className="heading heading-3">Attach operative form</h3>
            <Link
                className="button"
                to={location.pathname.replace('/attach-operative', '')}
            >
                Cancel
            </Link>
            <Link
                className="button"
                to={location.pathname.replace('/attach-operative', '')}
            >
                Save
            </Link>
        </div>
    </div>
);

export default withRouter(AttachOperativeForm);
