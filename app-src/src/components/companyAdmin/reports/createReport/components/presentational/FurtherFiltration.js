import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';

const FurtherFiltration = ({
    selected,
    furtherFiltrationOptions,
    handleChange
}) => (
    <Field name=" " sizeClasses="size-lg-12">
        <DropdownContainer
            placeholder="None"
            name="filterOption"
            options={furtherFiltrationOptions}
            selectedOption={selected}
            handleChange={handleChange}
        />
    </Field>
);

export default FurtherFiltration;
