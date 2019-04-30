import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Field from 'components/shared/generic/form/presentational/Field';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import DatePicker from 'components/shared/generic/form/presentational/DatePicker';

const BasicFilters = ({
    dateError,
    fieldError,
    handleChange,
    handleDateChange,
    handleDateBlur,
    serviceOptions,
    selectedService,
    statusOptions,
    selectedStatus,
    fromDateInclusive,
    toDateInclusive,
    historyNumsOptions,
    selectedHistoryNum
}) => (
    <div className="flex-item size-lg-6">
        <BlockContainer>
            <div className="size-lg-12">
                <BlockHeading title="Basic Filtration" />
                <Field name="Services">
                    <DropdownContainer
                        placeholder="Select Service"
                        name="serviceID"
                        options={serviceOptions}
                        selectedOption={selectedService}
                        handleChange={handleChange}
                    />
                </Field>
                <Field name="Status">
                    <DropdownContainer
                        placeholder="All Statuses"
                        name="status"
                        options={statusOptions}
                        selectedOption={selectedStatus}
                        handleChange={handleChange}
                    />
                </Field>
                <Field name="Date range" sizeClasses="w-dates size-lg-12">
                    <div className="size-lg-5">
                        <DatePicker
                            name="fromDateInclusive"
                            selected={fromDateInclusive}
                            onChange={val =>
                                handleDateChange('fromDateInclusive', val)
                            }
                            placeholderText="From Date"
                            onBlur={() => handleDateBlur(true)}
                        />
                    </div>
                    <p className="size-lg-2">to</p>
                    <div className="size-lg-5">
                        <DatePicker
                            name="toDateInclusive"
                            selected={toDateInclusive}
                            onChange={val =>
                                handleDateChange('toDateInclusive', val)
                            }
                            placeholderText="To Date"
                            onBlur={() => handleDateBlur()}
                        />
                    </div>
                    <div className="size-lg-12">
                        <p className="error red-text text-accent-4">
                            {dateError}
                        </p>
                    </div>
                </Field>
                <Field name="Number of Histories" reqiured={true}>
                    <DropdownContainer
                        singleSelect
                        name="reportHistories"
                        options={historyNumsOptions}
                        selectedOption={selectedHistoryNum}
                        handleChange={handleChange}
                        withoutPlaceholder
                    />
                </Field>

                {!!fieldError && (
                    <p className="error red-text text-accent-4">{fieldError}</p>
                )}
            </div>
        </BlockContainer>
    </div>
);

export default BasicFilters;
