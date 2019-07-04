import React from 'react';
import { withRouter } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import CompaniesAccessListContainer from '../containers/CompaniesAccessListContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';

const CompaniesAccessTable = ({
    location,
    companies,
    parentId,
    handleShowModal,
    isFetching,
    smallList,
    accessType
}) => (
    <div className="size-lg-12">
        <BlockHeading title="Company Permissions">
            {accessType === ACCESS_TYPES_VALUES.OWNER && (
                <ButtonContainer
                    className="pull-right green"
                    to={`${location.pathname}/invite-company`}
                >
                    <i className="fa fa-plus" /> Invite
                </ButtonContainer>
            )}
        </BlockHeading>
        <div
            className={`size-lg-12 ignore-padding ${
                smallList && companies.length > 3 ? 'scrollbar-y' : ''
            }`}
        >
            <Table
                headers={['Name', '', 'Actions']}
                isFetching={isFetching}
                noData={!companies.length}
                noDataMessage="No companies to display"
                withActions={accessType === ACCESS_TYPES_VALUES.OWNER}
                extraClasses="with-scrollbar"
            >
                <CompaniesAccessListContainer
                    accessType={accessType}
                    handleShowModal={handleShowModal}
                    companies={companies}
                    parentId={parentId}
                    smallList={smallList}
                    headers={['Name', '', 'Actions']}
                />
            </Table>
        </div>
    </div>
);

export default withRouter(CompaniesAccessTable);
