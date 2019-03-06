import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const ClientsTable = ({ location }) => (
    <div className="content-container size-lg-4">
        <div className="content-area size-lg-12">
            <h1 className="heading heading-3 size-lg-12">ClientsContainer</h1>
            <Link className="button" to={`${location.pathname}/attatch-client`}>
                Attatch client
            </Link>
        </div>
    </div>
);

export default withRouter(ClientsTable);
