import React from 'react';

import Dropdown from 'components/shared/generic/form/presentational/Dropdown';
import DatePickerPresentational from 'components/shared/generic/form/presentational/DatePicker';

const DashboardStatsFilters = ({
    serviceOptions,
    selectedService,
    statusOptions,
    selectedStatus,
    selectedStartDate,
    selectedEndDate,
    handleDateChange,
    handleChange,
    today
}) => (
    <>
        <form className="multi-filters size-lg-12">
            <div className="flex item ">
                <p className="">Selected Service:</p>
                <div className="flex size-lg-7">
                    <Dropdown
                        placeholder="--select service--"
                        name="serviceID"
                        options={serviceOptions}
                        selectedOption={selectedService}
                        handleChange={handleChange}
                    />
                </div>
            </div>
            <div className="flex item ">
                <p className="">Status:</p>
                <div className="flex size-lg-7">
                    <Dropdown
                        placeholder="--select status--"
                        name="status"
                        options={statusOptions}
                        selectedOption={selectedStatus}
                        handleChange={handleChange}
                    />
                </div>
            </div>
            <div className="flex item ">
                <p className="">Start Date:</p>
                <div className="flex">
                    <DatePickerPresentational
                        name="startDate"
                        selected={selectedStartDate}
                        onChange={date => handleDateChange('startDate', date)}
                        placeholderText="Date"
                        sizeClasses=""
                        maxDate={today}
                    />
                </div>
            </div>
            <div className="flex item ">
                <p className="">End Date:</p>
                <div className="flex">
                    <DatePickerPresentational
                        name="endDate"
                        selected={selectedEndDate}
                        onChange={date => handleDateChange('endDate', date)}
                        placeholderText="Date"
                        sizeClasses=""
                        maxDate={today}
                    />
                </div>
            </div>
        </form>
    </>
);

export default DashboardStatsFilters;
