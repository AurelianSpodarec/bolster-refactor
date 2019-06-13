import React from 'react';

import Search from 'components/shared/generic/form/presentational/Search';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const DashboardStatsFilters = ({
    serviceOptions,
    selectedService,
    daysToReturn,
    selectedPeriod,
    handleChange
}) => (
    <BlockContainer>
        <form className="table-search size-lg-12">
            <div className="table-filter size-lg-4">
                <Dropdown
                    placeholder="--select period--"
                    name="daysToReturn"
                    options={daysToReturn}
                    selectedOption={selectedPeriod}
                    handleChange={handleChange}
                />
                <p>Live time period:</p>
            </div>
            <div className="table-filter size-lg-4">
                <Dropdown
                    placeholder="--select service--"
                    name="serviceID"
                    options={serviceOptions}
                    selectedOption={selectedService}
                    handleChange={handleChange}
                />
                <p>Selected Service:</p>
            </div>
        </form>
    </BlockContainer>
);

export default DashboardStatsFilters;
