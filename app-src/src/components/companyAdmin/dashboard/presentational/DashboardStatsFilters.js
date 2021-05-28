import React from 'react';

import Dropdown from 'components/shared/generic/form/presentational/Dropdown';
// import ReactDatePicker from 'react-datepicker';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

const DashboardStatsFilters = ({
    serviceOptions,
    selectedService,
    statusOptions,
    selectedStatus,
    selectedStartDate,
    selectedEndDate,
    handleDateChange,
    handleMonthChange,
    monthOptions,
    selectedMonth,
    handleChange,
}) => {
    return (
        <>
            <form className="multi-filters size-lg-12">
                <div className="flex item ">
                    <p className="">Selected Service:</p>
                    <div className="flex size-lg-7 size-md-12">
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
                {/* <div className="flex item ">
                    <p className="">Dates</p>
                    <div className="flex">
                        <ReactDatePicker
                            selectsRange={true}
                            startDate={selectedStartDate}
                            endDate={selectedEndDate}
                            onChange={date => handleDateChange('dates', date)}
                            monthsShown={2}
                        />
                    </div>
                </div> */}
                <div className="flex item ">
                    <p className="">Dates</p>
                    <div className="flex">
                        <DateRangePicker
                            onChange={date => handleDateChange('dates', date)}
                            value={[selectedStartDate, selectedEndDate]}
                            showDoubleView
                            calendarIcon={null}
                            clearIcon={null}
                        />
                    </div>
                </div>
                <div className="flex item ">
                    <p className="">Month:</p>
                    <div className="flex size-lg-7">
                        <Dropdown
                            placeholder="--select status--"
                            name="month"
                            options={monthOptions}
                            selectedOption={selectedMonth}
                            handleChange={handleMonthChange}
                        />
                    </div>
                </div>
            </form>
        </>
    );
};

export default DashboardStatsFilters;
