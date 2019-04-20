import React from 'react';

import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';

const NumberOfHistories = ({
    numberOfHistoriesOptions,
    selectedHistory,
    handleChange
}) => (
    <Field name="Number of Hitories">
        <DropdownContainer
            placeholder="Please select'"
            name="numberOfHistoriesID"
            options={numberOfHistoriesOptions}
            selectedOption={selectedHistory}
            handleChange={handleChange}
        />
    </Field>
);

export default NumberOfHistories;
