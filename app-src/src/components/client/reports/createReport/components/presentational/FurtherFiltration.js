import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Select from 'components/shared/generic/form/presentational/Select';
import {
    NUMBER_OF_HISTORIES,
    NUMBER_OF_HISTORIES_OPTIONS
} from 'constants/companyAdmin/enums';

const historyNumsOptions = Object.entries(NUMBER_OF_HISTORIES)
    .map(([value, label]) => ({ value: +value, label }))
    .filter(({ value }) => value != NUMBER_OF_HISTORIES_OPTIONS.ALL);

const FurtherFiltration = ({
    selected,
    furtherFiltrationOptions,
    handleChange,
    selectedHistoryNum,
    handleNumOfHistoriesChange,
    isDisabled
}) => (
    <div className="generic-form">
        <Field name="Number of Histories" reqiured={true}>
            <Select
                singleSelect
                name="reportHistories"
                options={historyNumsOptions}
                value={selectedHistoryNum}
                onChange={handleNumOfHistoriesChange}
                omitPlaceholder
                required
            />
        </Field>
        {isDisabled && (
            <p className="generic-text small">
                Please select either a site or operative to use the advanced
                filter methods.
            </p>
        )}
        <Field name="Filter Method" sizeClasses="size-lg-12">
            <DropdownContainer
                placeholder="None"
                name="filterOption"
                options={furtherFiltrationOptions}
                value={selected}
                selectedOption={selected}
                handleChange={handleChange}
                disabled={isDisabled}
            />
        </Field>
    </div>
);

export default FurtherFiltration;
