import React from 'react';
import Search from 'components/shared/generic/form/presentational/Search';

const CompaniesFilters = ({ handleChange, name }) => (
    <>
        <Search
            value={name}
            name="name"
            placeholder="Search by company name or code..."
            handleChange={handleChange}
        />
    </>
);

export default CompaniesFilters;
