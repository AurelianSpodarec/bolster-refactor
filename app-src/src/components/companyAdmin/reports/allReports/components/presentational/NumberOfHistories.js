import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import NewSelect from 'components/shared/generic/form/presentational/NewSelect';

const NumberOfHistories = ({
    numberOfHistoriesOptions,
    selectedHistory,
    handleChange
}) => (
    <Field name="Number of Histories" reqiured={true}>
        <NewSelect
            singleSelect
            placeholder="Please select"
            name="numberOfHistoriesID"
            options={numberOfHistoriesOptions}
            value={selectedHistory}
            onChange={handleChange}
        />
    </Field>
);

export default NumberOfHistories;
