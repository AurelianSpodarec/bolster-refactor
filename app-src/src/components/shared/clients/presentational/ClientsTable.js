import React from 'react';
import { withRouter } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import ClientsList from './ClientsList';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const ClientsTable = ({
    location,
    clients,
    isFetching,
    error,
    handleDeleteClientModal
}) => (
    <div className="size-lg-12">
        <BlockHeading title="Client access">
            <ButtonContainer
                className="pull-right green"
                to={`${location.pathname}/invite-client`}
            >
                <i className="fa fa-plus" /> Invite
            </ButtonContainer>
        </BlockHeading>
        <div className="hide-overflow size-lg-12">
            <Table
                headers={['Name', 'Actions']}
                isFetching={isFetching}
                error={error}
                noData={!clients.length}
                noDataMessage="No clients to display."
                extraClasses="with-scrollbar"
            >
                <ClientsList
                    handleDeleteClientModal={handleDeleteClientModal}
                    location={location}
                    clients={clients}
                />
            </Table>
        </div>
    </div>
);

export default withRouter(ClientsTable);
