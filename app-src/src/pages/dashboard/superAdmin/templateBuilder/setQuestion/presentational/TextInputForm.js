import React from 'react';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';

const TextInputForm = ({ handleInputChange, charLimit }) => (
    <>
        <Field name="Character limit" required>
            <TextInputContainer
                name="charLimit"
                value={charLimit}
                handleChange={handleInputChange}
                required
                type="number"
            />
        </Field>
    </>
);

export default TextInputForm;
