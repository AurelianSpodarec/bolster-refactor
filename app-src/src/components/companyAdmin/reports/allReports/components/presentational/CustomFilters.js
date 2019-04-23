import React from 'react';

import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';

const CustomFilter = ({
    questionOptions,
    selectedQuestion,
    handleChange,
    removeOption,
    addOption,
    updateOption,
    questionValues
}) => (
    <>
        <Field name="Field Name">
            <DropdownContainer
                placeholder="Please select"
                name="fieldName"
                options={questionOptions}
                selectedOption={selectedQuestion}
                handleChange={handleChange}
                required
            />
            {questionValues.map((option, i) => (
                <Field name={`Option ${i + 1}`} key={option.id}>
                    <TextInputContainer
                        name={option.id}
                        value={option.value}
                        handleChange={updateOption}
                        required
                    />
                    {questionValues.length > 1 && (
                        <button
                            className="button"
                            onClick={() => removeOption(option.id)}
                        >
                            delete option
                        </button>
                    )}
                </Field>
            ))}
            <button className="button" type="button" onClick={addOption}>
                add option
            </button>
            <button className="button" type="button" onClick={removeOption}>
                X delete field
            </button>
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
