import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import ClientsList from './ClientsList';

const ClientsTable = ({
    location,
    clients,
    isFetching,
    error,
    handleDeleteClientModal
}) => (
    <div className="size-lg-12">
        <h1 className="heading heading-3 size-lg-12">Clients with access</h1>
        <Table
            headers={['Name', 'Actions']}
            isFetching={isFetching}
            error={error}
            noData={!clients.length}
            noDataMessage="There are no clients to display."
        >
            <ClientsList
                handleDeleteClientModal={handleDeleteClientModal}
                location={location}
                clients={clients}
            />
        </Table>

        <div className="button-container table">
            <Link
                className="button pull-right"
                to={`${location.pathname}/invite-client`}
            >
                <i className="fa fa-plus" /> Invite client
            </Link>
        </div>
    </div>
);

export default withRouter(ClientsTable);
