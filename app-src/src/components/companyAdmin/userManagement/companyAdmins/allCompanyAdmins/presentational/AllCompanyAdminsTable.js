import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import AllCompanyAdminsList from './AllCompanyAdminsList';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import { GREEN, GREEN_HOVER } from 'constants/shared/colorCodes';

const AllCompanyAdminsTable = ({
    headers,
    users,
    isFetching,
    error,
    showDeleteModal,
    handleCreateCompanyAdmin
}) => {
    return (
        <>
            <BlockHeading title="Admins">
                <ButtonContainer
                    handleClick={handleCreateCompanyAdmin}
                    setColour={GREEN}
                    setColourHoverCode={GREEN_HOVER}
                >
                    <i className="fa fa-plus" /> Create Admin
                </ButtonContainer>
                {/* <Link
                    className="button green"
                    to="/company/users-management/company-admins/create"
                >
                </Link> */}
            </BlockHeading>
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!users.length}
                noDataMessage="No admins to display."
                extraClasses="large"
            >
                <AllCompanyAdminsList
                    colCount={headers.length}
                    users={users}
                    showDeleteModal={showDeleteModal}
                />
            </Table>
        </>
    );
};

export default AllCompanyAdminsTable;
