import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const ClientsTable = ({ location }) => (
    <div className="size-lg-12">
        <h1 className="heading heading-3 size-lg-12">Clients with access</h1>
        <Link className="button" to={`${location.pathname}/invite-client`}>
            Attach client
        </Link>
    </div>
);

export default withRouter(ClientsTable);
