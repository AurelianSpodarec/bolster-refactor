import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import { isEmpty } from 'helpers/generic';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Search from 'components/shared/generic/form/presentational/Search';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import DeletedOperativesListItem from './DeletedOperativesListItem';

const headers = ['Name', 'Email', ''];

const DeletedOperativesTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { deleted, isFetching, error } = useSelector(mapStateToProps);

    return (
        <>
            <BlockContainer>
                <Search
                    value={searchTerm}
                    placeholder="Search by name/email"
                    handleChange={handleChange}
                    name="searchTerm"
                />
            </BlockContainer>
            <BlockContainer>
                <BlockHeading title="Deleted Operatives" />
                <Table
                    withActions
                    headers={headers}
                    isFetching={isFetching}
                    error={error}
                    noData={isEmpty(deleted)}
                    noDataMessage="No operatives to display."
                    extraClasses="large"
                >
                    {deleted.map(user => (
                        <DeletedOperativesListItem key={user.id} user={user} />
                    ))}
                </Table>
            </BlockContainer>
        </>
    );

    function handleChange(_, value) {
        setSearchTerm(value);
    }
};

const mapStateToProps = ({
    companyAdmin: {
        inactiveCompanyUsersReducer: { deleted, isFetching, error },
    },
}) => ({
    isFetching,
    error,
    deleted: Object.values(deleted).filter(user => user.type === COMPANY_USER_ROLE_TYPES.OPERATIVE),
});

export default DeletedOperativesTable;
