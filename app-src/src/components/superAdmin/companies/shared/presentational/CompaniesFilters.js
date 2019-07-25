import React from 'react';
import Search from 'components/shared/generic/form/presentational/Search';
import Select from 'components/shared/generic/form/presentational/Select';

const CompaniesFilters = ({
    handleChange,
    name,
    companyType,
    companyTypeOptions
}) => (
    <form className="table-search size-lg-12">
        <Search
            value={name}
            name="name"
            placeholder="Search by company name or code..."
            handleChange={handleChange}
        />
        <div className="table-filter">
            <Select
                value={companyType}
                name="companyType"
                options={companyTypeOptions}
                onChange={handleChange}
                omitPlaceholder
            />
        </div>
    </form>
);

export default CompaniesFilters;
