import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ActionButton from '../../../../../shared/generic/button/presentational/ActionButton';
import AllCompanyAdminsListItemContainer from '../containers/AllCompanyAdminsListItemContainer';

const AllCompanyAdminsTable = ({ headers, users, isFetching, error, handleShowModal }) => {
    return (
        <>
            <BlockHeading title="Active Admins">
                <ActionButton
                    onClick={handleShowModal}
                    extraClasses="ambient-positive"
                    text="Create Admin"
                    icon="user-plus"
                    size="medium"
                />
            </BlockHeading>
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!users.length}
                noDataMessage="No admins to display."
            >
                {users.map(user => (
                    <AllCompanyAdminsListItemContainer
                        key={user.id}
                        user={user}
                        headers={headers}
                    />
                ))}
            </Table>
        </>
    );
};

export default AllCompanyAdminsTable;
