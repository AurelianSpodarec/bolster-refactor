import React from 'react';
// import Search from 'components/shared/generic/form/presentational/Search';
// import Dropdown from 'components/shared/generic/form/presentational/Dropdown';

// TODO: Filtering

const UsersFilters = ({ handleChange }) => (
    <form className="table-search size-lg-12">
        <p>Filters here:</p>
        {/* <Search
            value={email}
            name="email"
            placeholder="Search by email address..."
            handleChange={handleChange}
        />
        <div className="table-filter">
            <Dropdown
                placeholder="All roles"
                name="role"
                options={roleOptions}
                selectedOption={selectedRole}
                handleChange={handleChange}
            />
            <p>Filter by role:</p>
        </div> */}
    </form>
);

export default UsersFilters;
