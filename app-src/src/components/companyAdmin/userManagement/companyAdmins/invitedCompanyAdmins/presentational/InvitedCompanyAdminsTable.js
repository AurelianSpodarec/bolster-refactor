import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import { isEmpty } from 'helpers/generic';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Search from 'components/shared/generic/form/presentational/Search';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import InvitedCompanyAdminsListItem from './InvitedCompanyAdminsListItem';

const headers = ['Name', 'Email', ''];

const InvitedCompanyAdminsTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { invited, isFetching, error } = useSelector(mapStateToProps);

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
                <BlockHeading title="Invited Admins" />
                <Table
                    withActions
                    headers={headers}
                    isFetching={isFetching}
                    error={error}
                    noData={isEmpty(invited)}
                    noDataMessage="No admins to display."
                    extraClasses="large"
                >
                    {invited.map(user => (
                        <InvitedCompanyAdminsListItem key={user.id} user={user} />
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
        inactiveCompanyUsersReducer: { invited, isFetching, error },
    },
}) => ({
    isFetching,
    error,
    invited: Object.values(invited).filter(user => user.type === COMPANY_USER_ROLE_TYPES.ADMIN),
});

export default InvitedCompanyAdminsTable;
