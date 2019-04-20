import React from 'react';

import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';

const LevelsDrawingsFilters = ({
    drawingOptions,
    selectedDrawing,
    handleChange
}) => (
    <>
        <Field name="Drawing">
            <DropdownContainer
                placeholder="-- select --"
                name="drawingID"
                options={drawingOptions}
                selectedOption={selectedDrawing}
                handleChange={handleChange}
            />
        </Field>
    </>
);

export default LevelsDrawingsFilters;
