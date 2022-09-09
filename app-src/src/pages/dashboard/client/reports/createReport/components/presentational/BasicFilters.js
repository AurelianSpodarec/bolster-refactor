import React from 'react';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Field from 'components/shared/generic/form/presentational/Field';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import DatePicker from 'components/shared/generic/form/presentational/DatePicker';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import TimePickerContainer from 'components/shared/generic/form/containers/TimePickerContainer';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';

const BasicFilters = ({
    dateError,
    fieldError,
    handleChange,
    handleDateChange,
    handleDateBlur,
    serviceOptions,
    selectedService,
    templateOptions,
    selectedTemplate,
    statusOptions,
    selectedStatus,
    fromDateInclusive,
    toDateInclusive,
    includeTime,
    startTime,
    endTime,
    handleStatusChange,
}) => (
    <div className="size-lg-12">
        <div className="size-lg-12">
            <BlockHeading title="General Filters" />
            <p className="generic-text small">
                Your high level filtration options can be found below.
            </p>
            <Field name="Services" required>
                <DropdownContainer
                    placeholder="Select Service"
                    name="serviceID"
                    options={serviceOptions}
                    selectedOption={selectedService}
                    value={selectedService}
                    handleChange={handleChange}
                    required
                />
            </Field>
            <Field name="Templates">
                <DropdownContainer
                    placeholder="Select Template"
                    name="templateID"
                    options={templateOptions}
                    selectedOption={selectedTemplate}
                    value={selectedTemplate}
                    handleChange={handleChange}
                />
            </Field>
            <Field name="Status">
                <MultiSelect
                    placeholder="All Statuses"
                    name="status"
                    options={statusOptions}
                    value={selectedStatus}
                    selectedOption={selectedStatus}
                    onChange={handleStatusChange}
                />
            </Field>
            <Field name="Date range" sizeClasses="w-dates size-lg-12">
                <div className="size-lg-5">
                    <DatePicker
                        name="fromDateInclusive"
                        selected={fromDateInclusive}
                        onChange={val => handleDateChange('fromDateInclusive', val)}
                        placeholderText="From Date"
                        onBlur={() => handleDateBlur(true)}
                    />
                </div>
                <p className="size-lg-2">to</p>
                <div className="size-lg-5">
                    <DatePicker
                        name="toDateInclusive"
                        selected={toDateInclusive}
                        onChange={val => handleDateChange('toDateInclusive', val)}
                        placeholderText="To Date"
                        onBlur={() => handleDateBlur()}
                    />
                </div>
                <div className="size-lg-12">
                    <p className="error red-text text-accent-4">{dateError}</p>
                </div>
            </Field>

            <Field name="Time range" sizeClasses="w-dates size-lg-12">
                <div className="size-lg-12 margin-bottom">
                    <CheckboxContainer
                        checked={includeTime}
                        handleChange={handleChange}
                        name="includeTime"
                        text="Include time"
                    />
                </div>
                {includeTime && (
                    <>
                        <div className="size-lg-5">
                            <TimePickerContainer
                                name="startTime"
                                value={startTime}
                                handleChange={val => handleChange('startTime', val)}
                            />
                        </div>
                        <p className="size-lg-2">to</p>
                        <div className="size-lg-5">
                            <TimePickerContainer
                                name="endTime"
                                value={endTime}
                                handleChange={val => handleChange('endTime', val)}
                            />
                        </div>
                    </>
                )}
            </Field>
            {/* {isDrawingPage && <OperativesFilterContainer advanced />} */}

            {!!fieldError && <p className="error red-text text-accent-4">{fieldError}</p>}
        </div>
    </div>
);

export default BasicFilters;
