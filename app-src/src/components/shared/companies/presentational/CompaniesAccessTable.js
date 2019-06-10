import React from 'react';
import { withRouter } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import CompaniesAccessListContainer from '../containers/CompaniesAccessListContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

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
            <ButtonContainer
                className="pull-right green"
                to={`${location.pathname}/invite-company`}
            >
                <i className="fa fa-plus" /> Invite
            </ButtonContainer>
        </BlockHeading>
        <div className="hide-overflow size-lg-12 always-scrollbar">
            <Table
                headers={
                    smallPod ? ['Name', 'Actions'] : ['Name', '', 'Actions']
                }
                isFetching={isFetching}
                noData={!companies.length}
                noDataMessage="No companies to display"
                withActions
                extraClasses="with-scrollbar"
            >
                <CompaniesAccessListContainer
                    handleShowModal={handleShowModal}
                    companies={companies}
                    parentId={parentId}
                    smallPod={smallPod}
                />
            </Table>
        </div>
    </div>
);

export default withRouter(CompaniesAccessTable);
