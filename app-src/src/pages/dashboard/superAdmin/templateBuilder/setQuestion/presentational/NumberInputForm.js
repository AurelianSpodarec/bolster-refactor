import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';

const NumberInputForm = ({ handleInputChange, maxNum }) => (
    <>
        <Field name="Maximum number">
            <TextInputContainer
                placeholder="No max"
                name="maxNum"
                value={maxNum}
                handleChange={handleInputChange}
                type="number"
            />
        </Field>
    </>
);

export default NumberInputForm;
