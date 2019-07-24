import React from 'react';
import Search from 'components/shared/generic/form/presentational/Search';
import Select from 'components/shared/generic/form/presentational/Select';

const CompaniesFilters = ({
    handleChange,
    name,
    companyType,
    companyTypeOptions
}) => (
    <div className="size-lg-12">
        <div className="size-lg-6">
            <Search
                value={name}
                name="name"
                placeholder="Search by company name or code..."
                handleChange={handleChange}
            />
        </div>
        <div className="size-lg-6">
            <Select
                value={companyType}
                name="companyType"
                options={companyTypeOptions}
                onChange={handleChange}
                omitPlaceholder
            />
        </div>
    </div>
);

export default CompaniesFilters;
