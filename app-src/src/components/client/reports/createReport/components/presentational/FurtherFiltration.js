import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';

const FurtherFiltration = ({
    selected,
    furtherFiltrationOptions,
    handleChange
}) => (
    <div className="generic-form">
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
