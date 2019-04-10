import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';

const MultiOptionForm = ({
    addOption,
    removeOption,
    updateOption,
    options,
    canEditOption,
    handleInputChange
}) => (
    <>
        {options.map((option, i) => {
            return (
                <Field key={option.id} name={`Option ${i + 1}`}>
                    {options.length > 1 && (
                        <button
                            onClick={e => removeOption(e, option.id)}
                            type="button"
                        >
                            Remove option
                        </button>
                    )}
                    <TextInputContainer
                        placeholder="[type option here]"
                        name={option.id}
                        required
                        handleChange={updateOption}
                        value={option.text}
                    />
                </Field>
            );
        })}
        <Field name="Can company edit?">
            <input
                name="canEditOption"
                type="checkbox"
                checked={canEditOption}
                onChange={handleInputChange}
            />
        </Field>
        <button onClick={addOption} type="button">
            Add option
        </button>
    </>
);

export default MultiOptionForm;
