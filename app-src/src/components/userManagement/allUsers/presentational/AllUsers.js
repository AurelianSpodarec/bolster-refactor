import React from 'react';
import UserTableContainer from '../containers/UserTableContainer';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';

const AllUsers = ({
    handleSearchInputChange,
    handleRoleFilterChange,
    filter,
    role
}) => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'Users' }]} />
        <PageHeading title="Users">
            <div className="area-filter">
                <Dropdown
                    handleChange={handleRoleFilterChange}
                    name="role"
                    options={[
                        { text: 'Company Admin', value: 'Company Admin' },
                        { text: 'Operative', value: 'Operative' }
                    ]}
                    selectedOption={role}
                />
                <i className="icon far fa-search" />
                <input
                    type="text"
                    name="filter"
                    placeholder="Search Email"
                    onChange={handleSearchInputChange}
                    value={filter}
                />
            </div>
        </PageHeading>
        <BlockContainer>
            <UserTableContainer filter={filter} />
        </BlockContainer>
    </>
);

export default AllUsers;
