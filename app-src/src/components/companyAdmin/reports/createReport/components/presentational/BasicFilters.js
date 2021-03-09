import React from 'react';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Field from 'components/shared/generic/form/presentational/Field';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import OperativesFilterContainer from '../containers/OperativesFilterContainer';
import DatePickerContainer from 'components/shared/generic/form/containers/DatePickerContainer';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import TimePicker from 'react-time-picker';
import TimePickerContainer from 'components/shared/generic/form/containers/TimePickerContainer';

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
    isDrawingPage,
    includeTime,
    startTime,
    endTime,
}) => (
    <>
        <div className="size-lg-12">
            <BlockHeading title="General Filters" />
            {!isDrawingPage && (
                <p className="generic-text small">
                    Your high level filtration options can be found below.
                </p>
            )}

            <Field name="Services" required>
                <DropdownContainer
                    placeholder="All services"
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
                    placeholder="All templates"
                    name="templateID"
                    options={templateOptions}
                    selectedOption={selectedTemplate}
                    value={selectedTemplate}
                    handleChange={handleChange}
                />
            </Field>
            <Field name="Status">
                <DropdownContainer
                    placeholder="All Statuses"
                    name="status"
                    options={statusOptions}
                    value={selectedStatus}
                    selectedOption={selectedStatus}
                    handleChange={handleChange}
                />
            </Field>

            <Field name="Date range" sizeClasses="w-dates size-lg-12">
                <div className="size-lg-5">
                    <DatePickerContainer
                        name="fromDateInclusive"
                        selected={fromDateInclusive}
                        onChange={val => handleDateChange('fromDateInclusive', val)}
                        placeholderText="From Date"
                        onBlur={() => handleDateBlur(true)}
                    />
                </div>
                <p className="size-lg-2">to</p>
                <div className="size-lg-5">
                    <DatePickerContainer
                        name="toDateInclusive"
                        selected={toDateInclusive}
                        onChange={val => handleDateChange('toDateInclusive', val)}
                        placeholderText="To Date"
                        onBlur={() => handleDateBlur()}
                        minDate={fromDateInclusive}
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
                                handleChange={handleChange}
                            />
                        </div>
                        <p className="size-lg-2">to</p>
                        <div className="size-lg-5">
                            <TimePickerContainer
                                name="endTime"
                                value={endTime}
                                handleChange={handleChange}
                            />
                        </div>
                    </>
                )}
            </Field>

            {isDrawingPage && <OperativesFilterContainer advanced />}

            {!!fieldError && <p className="error red-text text-accent-4">{fieldError}</p>}
        </div>
    </>
);

export default BasicFilters;
