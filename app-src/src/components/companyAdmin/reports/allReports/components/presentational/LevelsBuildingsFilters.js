import React from 'react';

import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';

const LevelsBuildingsFilters = ({
    buildingOptions,
    selectedBuilding,
    handleChange,
    classes = ''
}) => (
    <>
        <Field name="Building" classes={classes}>
            <DropdownContainer
                placeholder="-- select --"
                name="buildingID"
                options={buildingOptions}
                selectedOption={selectedBuilding}
                handleChange={handleChange}
            />
        </Field>
    </>
);

export default LevelsBuildingsFilters;
