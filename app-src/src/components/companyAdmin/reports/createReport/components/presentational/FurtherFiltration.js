import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Select from 'components/shared/generic/form/presentational/Select';

const FurtherFiltration = ({
    selected,
    furtherFiltrationOptions,
    handleChange,
    selectedHistoryNum,
    handleNumOfHistoriesChange,
    historyNumsOptions,
}) => (
    <div className="generic-form">
        <Field name="Number of Histories" required={true}>
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
        <Field name="Filter Method" sizeClasses="size-lg-12">
            <DropdownContainer
                placeholder="None"
                name="filterOption"
                options={furtherFiltrationOptions}
                value={selected}
                selectedOption={selected}
                handleChange={handleChange}
            />
        </Field>
    </div>
);

export default FurtherFiltration;
