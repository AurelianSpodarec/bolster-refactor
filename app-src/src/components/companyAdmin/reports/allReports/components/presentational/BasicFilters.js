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
    startDate,
    endDate,
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
                        name="statusID"
                        options={statusOptions}
                        selectedOption={selectedStatus}
                        handleChange={handleChange}
                    />
                </Field>
                <Field name="Date range" sizeClasses="w-dates size-lg-12">
                    <div className="size-lg-5">
                        <DatePicker
                            name="startDate"
                            selected={startDate}
                            onChange={val => handleDateChange('startDate', val)}
                            placeholderText="Date"
                            onBlur={() => handleDateBlur(true)}
                        />
                    </div>
                    <p className="size-lg-2">to</p>
                    <div className="size-lg-5">
                        <DatePicker
                            name="endDate"
                            selected={endDate}
                            onChange={val => handleDateChange('endDate', val)}
                            placeholderText="Date"
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
                        name="numberOfHistoriesID"
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
