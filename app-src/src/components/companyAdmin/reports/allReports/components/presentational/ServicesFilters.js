import React from 'react';

import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';

const ServicesFilters = ({ serviceOptions, selectedService, handleChange }) => (
    <Field name="Services">
        <DropdownContainer
            placeholder="Select Service"
            name="serviceID"
            options={serviceOptions}
            selectedOption={selectedService}
            handleChange={handleChange}
        />
    </Field>
);

export default ServicesFilters;
