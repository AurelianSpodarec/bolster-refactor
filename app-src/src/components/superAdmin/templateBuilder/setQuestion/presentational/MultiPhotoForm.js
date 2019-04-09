import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';

const MultiPhotoForm = ({ handleInputChange, maxPhotos }) => (
    <>
        <Field name="Maximum files">
            <TextInputContainer
                name="maxPhotos"
                value={maxPhotos}
                handleChange={handleInputChange}
                type="number"
                required
            />
        </Field>
    </>
);

export default MultiPhotoForm;
