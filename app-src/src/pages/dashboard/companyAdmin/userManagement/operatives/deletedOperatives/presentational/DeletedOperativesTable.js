import React from 'react';
import { useSelector } from 'react-redux';

import { isEmpty } from 'helpers/generic';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import DeletedOperativesListItem from './DeletedOperativesListItem';

const headers = [
    'Name',
    'Email',
    'Phone Number',
    'Operative Code',
    'Date Deleted',
    'Deleted By',
    '',
];

const DeletedOperativesTable = ({ filteredUsers }) => {
    const { deleted, isFetching, error } = useSelector(mapStateToProps);

    return (
        <BlockContainer>
            <BlockHeading title="Deleted Operatives" />
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={isEmpty(filteredUsers(deleted))}
                noDataMessage="No operatives to display."
                extraClasses="large"
            >
                {filteredUsers(deleted).map(user => (
                    <DeletedOperativesListItem key={user.id} user={user} headers={headers} />
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

export default DeletedOperativesTable;
