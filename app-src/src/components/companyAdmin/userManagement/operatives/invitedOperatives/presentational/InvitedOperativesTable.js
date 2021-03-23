import React from 'react';
import { useSelector } from 'react-redux';

import { isEmpty } from 'helpers/generic';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import InvitedOperativesListItem from './InvitedOperativesListItem';

const headers = ['Name', 'Email'];

const InvitedOperativesTable = ({ filteredUsers }) => {
    const { invited, isFetching, error } = useSelector(mapStateToProps);

    return (
        <BlockContainer>
            <BlockHeading title="Invited Operatives" />
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={isEmpty(filteredUsers(invited))}
                noDataMessage="No operatives to display."
                extraClasses="large"
            >
                {filteredUsers(invited).map(user => (
                    <InvitedOperativesListItem key={user.id} user={user} />
                ))}
            </Table>
        </BlockContainer>
    );
};

const mapStateToProps = ({
    companyAdmin: {
        inactiveCompanyUsersReducer: { invited, isFetching, error },
    },
}) => ({
    isFetching,
    error,
    invited: Object.values(invited),
});

export default InvitedOperativesTable;
