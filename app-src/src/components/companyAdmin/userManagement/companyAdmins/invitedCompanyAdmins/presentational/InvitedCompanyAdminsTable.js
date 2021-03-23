import React from 'react';
import { useSelector } from 'react-redux';

import { isEmpty } from 'helpers/generic';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import InvitedCompanyAdminsListItem from './InvitedCompanyAdminsListItem';

const headers = ['Name', 'Email'];

const InvitedCompanyAdminsTable = ({ filteredUsers }) => {
    const { invited, isFetching, error } = useSelector(mapStateToProps);

    return (
        <BlockContainer>
            <BlockHeading title="Invited Admins" />
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={isEmpty(filteredUsers(invited))}
                noDataMessage="No admins to display."
                extraClasses="large"
            >
                {filteredUsers(invited).map(user => (
                    <InvitedCompanyAdminsListItem key={user.id} user={user} />
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

export default InvitedCompanyAdminsTable;
