import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';

const NumberInputForm = ({ handleInputChange, maxNum }) => (
    <>
        <Field name="Maximum number">
            <TextInputContainer
                type="number"
                name="maxNum"
                value={maxNum === null ? undefined : maxNum}
                handleChange={handleInputChange}
                required
            />
        </Field>
    </>
);

export default NumberInputForm;
