import React from 'react';
import Search from 'components/shared/generic/form/presentational/Search';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';

const UsersFilters = ({ searchTerm, roleOptions, selectedRole, handleChange }) => {
    return (
        <form className="table-search size-lg-12">
            <Search
                value={searchTerm}
                name="searchTerm"
                placeholder="Search by name, email..."
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
            </div>
        </form>
    );
};

export default UsersFilters;
