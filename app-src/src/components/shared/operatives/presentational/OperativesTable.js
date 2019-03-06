import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const OperativesTable = ({ location }) => (
    <div className="size-lg-12">
        <h1 className="heading heading-3 size-lg-12">Operatives with access</h1>
        <Link className="button" to={`${location.pathname}/attach-operative`}>
            Attach operative
        </Link>
    </div>
);

export default withRouter(OperativesTable);
