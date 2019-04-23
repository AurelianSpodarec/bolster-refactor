import React from 'react';

import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';

const ServicesFilters = ({ serviceOptions, selectedService, handleChange }) => (
    <Field name="Services" required={true}>
        <DropdownContainer
            placeholder="Select Service"
            name="serviceID"
            options={serviceOptions}
            selectedOption={selectedService}
            handleChange={handleChange}
            required
        />
    </Field>
);

export default ServicesFilters;
