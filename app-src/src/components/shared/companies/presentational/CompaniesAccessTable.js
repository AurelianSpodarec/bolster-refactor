import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import CompaniesAccessListContainer from '../containers/CompaniesAccessListContainer';
import ButtonNoClickContainer from 'components/shared/generic/button/containers/ButtonNoClickContainer';

const CompaniesAccessTable = ({
    location,
    companies,
    parentId,
    handleShowModal,
    isFetching,
    smallPod
}) => (
    <div className="size-lg-12">
        <BlockHeading title="Company Access">
            <ButtonNoClickContainer
                className="pull-right"
                to={`${location.pathname}/invite-company`}
            >
                <i className="fa fa-plus" /> Invite
            </ButtonNoClickContainer>
        </BlockHeading>
        <Table
            headers={smallPod ? ['Name', 'Actions'] : ['Name', '', 'Actions']}
            isFetching={isFetching}
            noData={!companies.length}
            noDataMessage="No companies to display"
            withActions
        >
            <CompaniesAccessListContainer
                handleShowModal={handleShowModal}
                companies={companies}
                parentId={parentId}
                smallPod={smallPod}
            />
        </Table>
    </div>
);

export default withRouter(CompaniesAccessTable);
