import React from 'react';
import UserTableContainer from '../containers/UserTableContainer';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';

const AllUsers = ({
    handleInputChange,
    filter,
    role,
    roleOptions
    // placeholder = 'Filter by role'
}) => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'Users' }]} />
        <PageHeading title="Users">
            <div className="area-filter">
                <Dropdown
                    handleChange={handleInputChange}
                    name="role"
                    options={roleOptions}
                    selectedOption={role}
                    placeholder={'filter by role..'}
                />
                <i className="icon far fa-search" />
                <input
                    type="text"
                    name="filter"
                    placeholder="Search Email"
                    onChange={handleInputChange}
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
