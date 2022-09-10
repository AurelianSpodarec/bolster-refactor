import React from 'react';
import { withRouter } from 'react-router-dom';

import Table from 'components_DEPRECATED/shared/generic/tables/presentational/Table';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';
import CompaniesAccessListContainer from '../containers/CompaniesAccessListContainer';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import LinkButton from 'components_DEPRECATED/shared/generic/button/presentational/LinkButton';

const CompaniesAccessTable = ({
    location,
    companies,
    parentId,
    handleShowModal,
    isFetching,
    accessType,
}) => (
    <div className="size-lg-12">
        <BlockHeading title="Company Permissions">
            {accessType === ACCESS_TYPES_VALUES.OWNER && (
                <ButtonWrapper alignment="right">
                    <LinkButton
                        href={`${location.pathname}/invite-company`}
                        icon="plus"
                        ambient="positive"
                        text="Invite"
                    />
                </ButtonWrapper>
            )}
        </BlockHeading>
        <div className={`size-lg-12 ignore-padding ${companies.length > 3 ? 'scrollbar-y' : ''}`}>
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
                    headers={['Name', '', 'Actions']}
                />
            </Table>
        </div>
    </div>
);

export default withRouter(CompaniesAccessTable);
