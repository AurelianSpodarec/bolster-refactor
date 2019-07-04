import React from 'react';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';

const CompanyReportsFilters = ({
    sortOptions,
    handleChange,
    selectedOption,
    onMobile
}) => (
    <form className="table-search in-table">
        <div className="table-filter">
            {onMobile ? (
                <>
                    <p>Sort by:</p>
                    <Dropdown
                        options={sortOptions}
                        selectedOption={selectedOption}
                        handleChange={handleChange}
                        withoutPlaceholder
                    />
                </>
            ) : (
                <>
                    <Dropdown
                        options={sortOptions}
                        selectedOption={selectedOption}
                        handleChange={handleChange}
                        withoutPlaceholder
                    />
                    <p>Sort by:</p>
                </>
            )}
        </div>
    </form>
);

export default CompanyReportsFilters;
