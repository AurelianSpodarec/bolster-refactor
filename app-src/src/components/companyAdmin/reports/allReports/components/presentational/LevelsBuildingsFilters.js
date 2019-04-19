import React from 'react';

import Search from 'components/shared/generic/form/presentational/Search';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';

const LevelsBuildingsFilters = ({
    buildingOptions,
    selectedBuilding,
    handleChange
}) => (
    <>
        <Field>
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
