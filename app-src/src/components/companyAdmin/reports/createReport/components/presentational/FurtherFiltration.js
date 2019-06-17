import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import { NUMBER_OF_HISTORIES } from 'constants/companyAdmin/enums';
import Select from 'components/shared/generic/form/presentational/Select';

const historyNumsOptions = Object.entries(NUMBER_OF_HISTORIES).map(
    ([value, label]) => ({ value: +value, label })
);

const FurtherFiltration = ({
    selected,
    furtherFiltrationOptions,
    handleChange,
    selectedHistoryNum,
    handleNumOfHistoriesChange
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
        <Field name=" " sizeClasses="size-lg-12">
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
