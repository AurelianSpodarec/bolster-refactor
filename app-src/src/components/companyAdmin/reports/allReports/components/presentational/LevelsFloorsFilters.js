import React from 'react';

import Search from 'components/shared/generic/form/presentational/Search';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';

const LevelsFloorsFilters = ({ floorOptions, selectedFloor, handleChange }) => (
    <>
        <Field name="Floor">
            <DropdownContainer
                placeholder="-- select --"
                name="floorID"
                options={floorOptions}
                selectedOption={selectedFloor}
                handleChange={handleChange}
            />
        </Field>
    </>
);

export default LevelsFloorsFilters;
