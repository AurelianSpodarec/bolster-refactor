import React from 'react';

import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';

const LevelsFloorsFilters = ({
    floorOptions,
    selectedFloor,
    handleChange,
    classes = ''
}) => (
    <Field name="Floor" classes={classes}>
        <DropdownContainer
            placeholder="All Floors"
            name="floorID"
            options={floorOptions}
            selectedOption={selectedFloor}
            handleChange={handleChange}
        />
    </Field>
);

export default LevelsFloorsFilters;
