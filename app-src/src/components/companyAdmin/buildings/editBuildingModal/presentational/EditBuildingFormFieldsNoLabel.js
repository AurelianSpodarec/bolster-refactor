import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';

// * .*. in names is used for splitting up field validations without risking overlap with real names

const BuildingFormFieldsNoLabel = ({ handleInputChange, name, location }) => (
    <div className="size-lg-12">
        <div className="size-lg-6">
            <Field name="Building name" required>
                <TextInputContainer
                    name="name"
                    value={name}
                    handleChange={handleInputChange}
                    required
                />
            </Field>
        </div>
        <div className="size-lg-6">
            <Field name="Location">
                <TextInputContainer
                    value={location}
                    name="location"
                    handleChange={handleInputChange}
                />
            </Field>
        </div>
    </div>
);

export default BuildingFormFieldsNoLabel;
