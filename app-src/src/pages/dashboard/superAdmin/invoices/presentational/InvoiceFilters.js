import React from 'react';
import Search from 'components_DEPRECATED/shared/generic/form/presentational/Search';
import Dropdown from 'components_DEPRECATED/shared/generic/form/presentational/Dropdown';

const InvoiceFilters = ({
    searchTerm,
    handleChange,
    hasPayedOptions,
    hasPayedOptionSelected,
    handleSearch,
}) => (
    <form className="table-search size-lg-12">
        <Search
            value={searchTerm}
            name="searchTerm"
            placeholder="Search by Company name or Order ID..."
            handleChange={handleSearch}
        />
        <div className="table-filter">
            <Dropdown
                name="hasPayed"
                options={hasPayedOptions}
                selectedOption={hasPayedOptionSelected}
                handleChange={handleChange}
            />
            <p>Filter by status:</p>
        </div>
    </form>
);

export default InvoiceFilters;
