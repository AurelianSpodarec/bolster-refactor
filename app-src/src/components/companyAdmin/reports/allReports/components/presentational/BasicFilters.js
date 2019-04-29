import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Field from 'components/shared/generic/form/presentational/Field';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import DatePicker from 'components/shared/generic/form/presentational/DatePicker';
import NewSelect from 'components/shared/generic/form/presentational/NewSelect';

const BasicFilters = ({
    handleChange,
    handleDateChange,
    handleHistoryNumChange,
    serviceOptions,
    selectedService,
    statusOptions,
    selectedStatus,
    startDate,
    endDate,
    historyNumsOptions,
    numberOfHistoriesID
}) => (
    <div className="flex-item size-lg-6">
        <BlockContainer>
            <div className="size-lg-12">
                <BlockHeading title="Basic Filtration" />
                <Field name="Services" required={true}>
                    <DropdownContainer
                        placeholder="Select Service"
                        name="serviceID"
                        options={serviceOptions}
                        selectedOption={selectedService}
                        handleChange={handleChange}
                        required
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
                        />
                    </div>
                    <p className="size-lg-2">to</p>
                    <div className="size-lg-5">
                        <DatePicker
                            name="endDate"
                            selected={endDate}
                            onChange={val => handleDateChange('endDate', val)}
                            placeholderText="Date"
                        />
                    </div>
                </Field>
                <Field name="Number of Histories" reqiured={true}>
                    <NewSelect
                        singleSelect
                        placeholder="Please select"
                        name="numberOfHistoriesID"
                        options={historyNumsOptions}
                        value={numberOfHistoriesID}
                        onChange={handleHistoryNumChange}
                    />
                </Field>
            </div>
        </BlockContainer>
    </div>
);

export default BasicFilters;
