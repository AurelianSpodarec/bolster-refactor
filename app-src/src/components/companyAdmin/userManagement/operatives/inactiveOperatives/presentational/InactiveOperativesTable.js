import React from 'react';
import { useSelector } from 'react-redux';

import { isEmpty } from 'helpers/generic';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import InactiveOperativesListItem from './InactiveOperativesListItem';

const headers = ['Name', 'Email', ''];

const InactiveOperativesTable = ({ filteredUsers }) => {
    const { inactive, isFetching, error } = useSelector(mapStateToProps);

    return (
        <BlockContainer>
            <BlockHeading title="Inactive Operatives" />
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={isEmpty(filteredUsers(inactive))}
                noDataMessage="No operatives to display."
                extraClasses="large"
            >
                {filteredUsers(inactive).map(user => (
                    <InactiveOperativesListItem key={user.id} user={user} />
                ))}
            </Table>
        </BlockContainer>
    );
};

const mapStateToProps = ({
    companyAdmin: {
        inactiveCompanyUsersReducer: { inactive, isFetching, error },
    },
}) => ({
    isFetching,
    error,
    inactive: Object.values(inactive),
});

export default InactiveOperativesTable;
