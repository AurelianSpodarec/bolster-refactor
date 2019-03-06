import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const ClientsTable = ({ location }) => (
    <div className="size-lg-12">
        <h2 className="heading heading-3 size-lg-12">Clients with access</h2>
        <Link className="button" to={`${location.pathname}/attach-client`}>
            Attach client
        </Link>
    </div>
);

export default withRouter(ClientsTable);
