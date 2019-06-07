import React from 'react';
import Search from 'components/shared/generic/form/presentational/Search';

const ApprovedCompaniesFilters = ({ handleChange, name }) => (
    <>
        <form className="table-search size-lg-12">
            <Search
                value={name}
                name="name"
                placeholder="Search by company name or code..."
                handleChange={handleChange}
            />
        </form>
    </>
);

export default ApprovedCompaniesFilters;
