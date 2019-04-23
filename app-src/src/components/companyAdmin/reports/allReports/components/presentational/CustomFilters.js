import React from 'react';

import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';

const CustomFilter = ({ questionsOptions, selectedQuestion, handleChange }) => (
    <>
        <Field name="Field Name">
            <DropdownContainer
                placeholder="Please select'"
                name="sortByID"
                options={questionsOptions}
                selectedOption={selectedQuestion}
                handleChange={handleChange}
            />
        </Field>

        {/* <Field name="Value">
        <TextInputContainer
            value={postcode}
            name="postcode"
            handleChange={handleInputChange}
            required
        />
    </Field> */}
    </>
);

export default CustomFilter;
