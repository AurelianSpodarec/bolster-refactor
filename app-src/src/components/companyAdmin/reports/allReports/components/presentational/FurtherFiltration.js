import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';

const FurtherFiltration = ({
    selectedFutherFiltration,
    futherFiltrationOptions,
    handleChange
}) => (
    <Field name="Further Filtration" sizeClasses="size-lg-6">
        <DropdownContainer
            placeholder="Please select'"
            name="filterOption"
            options={futherFiltrationOptions}
            selectedOption={selectedFutherFiltration}
            handleChange={handleChange}
        />
    </Field>
);

export default FurtherFiltration;
