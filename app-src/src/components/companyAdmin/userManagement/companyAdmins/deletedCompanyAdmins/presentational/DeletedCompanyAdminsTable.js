import React from 'react';
import { useSelector } from 'react-redux';

import { isEmpty } from 'helpers/generic';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import DeletedCompanyAdminsListItem from './DeletedCompanyAdminsListItem';

const headers = ['Name', 'Email', 'Phone Number', 'Operative Code', ''];

const DeletedCompanyAdminsTable = ({ filteredUsers }) => {
    const { deleted, isFetching, error } = useSelector(mapStateToProps);

    return (
        <BlockContainer>
            <BlockHeading title="Deleted Admins" />
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={isEmpty(filteredUsers(deleted))}
                noDataMessage="No admins to display."
                extraClasses="large"
            >
                {filteredUsers(deleted).map(user => (
                    <DeletedCompanyAdminsListItem key={user.id} user={user} headers={headers} />
                ))}
            </Table>
        </BlockContainer>
    );
};

const mapStateToProps = ({
    companyAdmin: {
        inactiveCompanyUsersReducer: { deleted, isFetching, error },
    },
}) => ({
    isFetching,
    error,
    deleted: Object.values(deleted),
});

export default DeletedCompanyAdminsTable;
