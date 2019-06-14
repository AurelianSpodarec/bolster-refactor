import React from 'react';

import Search from 'components/shared/generic/form/presentational/Search';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import DatePickerPresentational from 'components/shared/generic/form/presentational/DatePicker';

const DashboardStatsFilters = ({
    serviceOptions,
    selectedService,
    daysToReturn,
    selectedPeriod,
    timePeriodStartDate,
    handleDateChange,
    handleChange
}) => (
    <BlockContainer>
        <form className="multi-filters size-lg-12">
            <div className="size-lg-4">
                <p className="size-lg-4">Selected Service:</p>
                <div className="size-lg-8">
                    <Dropdown
                        placeholder="--select service--"
                        name="serviceID"
                        options={serviceOptions}
                        selectedOption={selectedService}
                        handleChange={handleChange}
                    />
                </div>
            </div>
            <div className="size-lg-4">
                <p className="size-lg-4">Live time period:</p>
                <div className="size-lg-8">
                    <Dropdown
                        placeholder="--select period--"
                        name="daysToReturn"
                        options={daysToReturn}
                        selectedOption={selectedPeriod}
                        handleChange={handleChange}
                    />
                </div>
            </div>
            <div className="size-lg-4">
                <p className="size-lg-4">Start Date:</p>
                <div className="size-lg-8">
                    <DatePickerPresentational
                        name="timePeriodStartDate"
                        selected={timePeriodStartDate}
                        onChange={date =>
                            handleDateChange('timePeriodStartDate', date)
                        }
                        placeholderText="Date"
                        sizeClasses=""
                    />
                </div>
            </div>
        </form>
    </BlockContainer>
);

export default DashboardStatsFilters;
