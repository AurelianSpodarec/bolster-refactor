import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import ClientsList from './ClientsList';

const ClientsTable = ({ location, clients, isFetching, error }) => {
    const tableHeaders = ['Name', 'Actions'];

    return (
        <div className="size-lg-12">
            <h1 className="heading heading-3 size-lg-12">
                Clients with access
            </h1>
            <Table
                headers={tableHeaders}
                isFetching={isFetching}
                error={error}
                noData={!clients.length}
                noDataMessage="There are no clients to display."
            >
                <ClientsList clients={clients} />
            </Table>
            <Link className="button" to={`${location.pathname}/invite-client`}>
                <i className="fal fa-plus" /> Invite client
            </Link>
        </div>
    );
};

export default withRouter(ClientsTable);
