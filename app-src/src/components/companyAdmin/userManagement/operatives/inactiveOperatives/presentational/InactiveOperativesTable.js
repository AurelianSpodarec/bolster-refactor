import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import { isEmpty } from 'helpers/generic';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Search from 'components/shared/generic/form/presentational/Search';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import InactiveOperativesListItem from './InactiveOperativesListItem';

const headers = ['Name', 'Email', ''];

const InactiveOperativesTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { inactive, isFetching, error } = useSelector(mapStateToProps);

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
                <BlockHeading title="Inactive Operatives" />
                <Table
                    withActions
                    headers={headers}
                    isFetching={isFetching}
                    error={error}
                    noData={isEmpty(inactive)}
                    noDataMessage="No operatives to display."
                    extraClasses="large"
                >
                    {inactive.map(user => (
                        <InactiveOperativesListItem key={user.id} user={user} />
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
        inactiveCompanyUsersReducer: { inactive, isFetching, error },
    },
}) => ({
    isFetching,
    error,
    inactive: Object.values(inactive).filter(
        user => user.type === COMPANY_USER_ROLE_TYPES.OPERATIVE,
    ),
});

export default InactiveOperativesTable;
