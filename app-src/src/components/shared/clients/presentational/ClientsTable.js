import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import ClientsList from './ClientsList';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonNoClickContainer from 'components/shared/generic/button/containers/ButtonNoClickContainer';

const ClientsTable = ({
    location,
    clients,
    isFetching,
    error,
    handleDeleteClientModal
}) => (
    <div className="size-lg-12">
        <BlockHeading title="Client access">
            <ButtonNoClickContainer
                className="pull-right"
                to={`${location.pathname}/invite-client`}
            >
                <i className="fa fa-plus" /> Invite
            </ButtonNoClickContainer>
        </BlockHeading>
        <Table
            headers={['Name', 'Actions']}
            isFetching={isFetching}
            error={error}
            noData={!clients.length}
            noDataMessage="No clients to display"
        >
            <ClientsList
                handleDeleteClientModal={handleDeleteClientModal}
                location={location}
                clients={clients}
            />
        </Table>
    </div>
);

export default withRouter(ClientsTable);
