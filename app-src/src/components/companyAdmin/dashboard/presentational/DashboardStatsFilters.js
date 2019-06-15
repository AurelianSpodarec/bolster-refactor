import React from 'react';

import Dropdown from 'components/shared/generic/form/presentational/Dropdown';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import DatePickerPresentational from 'components/shared/generic/form/presentational/DatePicker';

const DashboardStatsFilters = ({
    serviceOptions,
    selectedService,
    statusOptions,
    selectedStatus,
    selectedStartDate,
    selectedEndDate,
    handleDateChange,
    handleChange
}) => (
    <BlockContainer>
        <form className="multi-filters size-lg-12">
            <div className="flex size-lg-3">
                <p className="size-lg-4">Selected Service:</p>
                <div className="flex size-lg-8">
                    <Dropdown
                        placeholder="--select service--"
                        name="serviceID"
                        options={serviceOptions}
                        selectedOption={selectedService}
                        handleChange={handleChange}
                    />
                </div>
            </div>
            <div className="flex size-lg-3">
                <p className="size-lg-4">Status:</p>
                <div className="flex size-lg-8">
                    <Dropdown
                        placeholder="--select status--"
                        name="status"
                        options={statusOptions}
                        selectedOption={selectedStatus}
                        handleChange={handleChange}
                    />
                </div>
            </div>
            <div className="flex size-lg-3">
                <p className="size-lg-4">Start Date:</p>
                <div className="flex size-lg-8">
                    <DatePickerPresentational
                        name="startDate"
                        selected={selectedStartDate}
                        onChange={date => handleDateChange('startDate', date)}
                        placeholderText="Date"
                        sizeClasses=""
                    />
                </div>
            </div>
            <div className="flex size-lg-3">
                <p className="size-lg-4">End Date:</p>
                <div className="flex size-lg-8">
                    <DatePickerPresentational
                        name="endDate"
                        selected={selectedEndDate}
                        onChange={date => handleDateChange('endDate', date)}
                        placeholderText="Date"
                        sizeClasses=""
                    />
                </div>
            </div>
        </form>
    </BlockContainer>
);

export default DashboardStatsFilters;
