import React from 'react';
import { withRouter } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import ClientsList from './ClientsList';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';

const ClientsTable = ({
    location,
    clients,
    isFetching,
    error,
    handleDeleteClientModal,
    smallList = false,
}) => (
    <div className="size-lg-12">
        <BlockHeading title="Invite Client">
            <ButtonWrapper alignment="right">
                <LinkButton
                    href={`${location.pathname}/invite-client`}
                    icon="plus"
                    ambient="positive"
                    text="Invite"
                />
            </ButtonWrapper>
        </BlockHeading>
        <div
            className={`size-lg-12 ignore-padding ${
                smallList && clients.length > 3 ? 'scrollbar-y' : ''
            }`}
        >
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
