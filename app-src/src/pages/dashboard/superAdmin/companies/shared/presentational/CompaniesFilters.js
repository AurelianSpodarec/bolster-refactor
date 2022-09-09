import React from 'react';
import Search from 'components/shared/generic/form/presentational/Search';
import Select from 'components/shared/generic/form/presentational/Select';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';

const CompaniesFilters = ({
    handleChange,
    name,
    companyType,
    companyTypeOptions,
    serviceOptions,
    serviceIDs,
}) => (
    <form className="table-search size-lg-12">
        <Search
            value={name}
            name="name"
            placeholder="Search by company name or code..."
            handleChange={handleChange}
        />
        <div className="table-filter">
            <div className="size-lg-10">
                <div className="size-lg-2">
                    <p>Type:</p>
                </div>
                <div className="size-lg-10">
                    <Select
                        value={companyType}
                        name="companyType"
                        options={companyTypeOptions}
                        onChange={handleChange}
                        omitPlaceholder
                    />
                </div>
            </div>
            <div className="size-lg-10">
                <div className="size-lg-2">
                    <p>Services</p>
                </div>
                <div className="size-lg-10">
                    <MultiSelect
                        value={serviceIDs}
                        options={serviceOptions}
                        onChange={handleChange}
                        name="serviceIDs"
                        placeholder="All services"
                    />
                </div>
            </div>
        </div>
    </form>
);

export default CompaniesFilters;
