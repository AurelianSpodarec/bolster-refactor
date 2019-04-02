import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const ClientsInvite = ({ type, location }) => (
    <div className="size-lg-12">
        <h1 className="heading heading-3 size-lg-12">Invite Client</h1>
        <p className="generic-text size-lg-12">
            If you invite a client to this {type}, they will be given access to
            each drawing it contains. To remove the client you will need to
            remove them from each drawing individually.
        </p>
        <p className="generic-text size-lg-12">
            You can view a list of all clients who have access{' '}
            <Link to={`${location.pathname}/client-access`}>here</Link>.
        </p>

        <div className="button-container">
            <Link
                className="button pull-right"
                to={`${location.pathname}/invite-client`}
            >
                <i className="fal fa-plus" /> Invite client
            </Link>
        </div>
    </div>
);

export default withRouter(ClientsInvite);
