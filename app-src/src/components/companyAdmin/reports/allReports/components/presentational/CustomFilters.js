import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import NewSelect from 'components/shared/generic/form/presentational/NewSelect';

const CustomFilter = ({
    questionOptions,
    selectedQuestions,
    handleChange,
    removeOption,
    removeField,
    addOption,
    updateOption,
    questionValues
}) => (
    <Field name="Field Name">
        <NewSelect
            name="fieldName"
            value={selectedQuestions}
            options={questionOptions}
            onChange={handleChange}
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
                        type="button"
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
        <button className="button" type="button" onClick={removeField}>
            X delete field
        </button>
    </Field>
);

export default CustomFilter;
