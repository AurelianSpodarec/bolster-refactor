import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const OperativesTable = ({ location }) => (
    <div className="content-container size-lg-4">
        <div className="content-area size-lg-12">
            <h1 className="heading heading-3 size-lg-12">Operatives</h1>
            <Link
                className="button"
                to={`${location.pathname}/attatch-operative`}
            >
                Attatch operative
            </Link>
        </div>
    </div>
);

export default withRouter(OperativesTable);
