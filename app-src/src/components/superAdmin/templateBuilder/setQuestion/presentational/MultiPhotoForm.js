import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';

const MultiPhotoForm = ({ handleInputChange, maxPhotos }) => (
    <Field name="Maximum files" required>
        <TextInputContainer
            name="maxPhotos"
            value={maxPhotos}
            handleChange={handleInputChange}
            type="number"
            required
            validate={val =>
                val <= 0 || val % 1 ? 'Please enter a positive integer' : null
            }
        />
    </Field>
);

export default MultiPhotoForm;
