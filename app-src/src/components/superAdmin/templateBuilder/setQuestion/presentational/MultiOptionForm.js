import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Checkbox from 'components/shared/generic/form/presentational/Checkbox';

const MultiOptionForm = ({
    addOption,
    removeOption,
    updateOption,
    options,
    canCompanyEdit,
    handleInputChange
}) => (
    <div className="dropdown-create size-lg-12">
        {options.map((option, i) => {
            return (
                <Field key={option.id} name={`Option ${i + 1}`} required>
                    {options.length > 1 && (
                        <button
                            className="button red icon-only delete-question"
                            onClick={e => removeOption(e, option.id)}
                            type="button"
                        >
                            <i className="far fa-trash-alt" />
                        </button>
                    )}
                    <TextInputContainer
                        placeholder="Type the option here"
                        name={option.id}
                        required
                        handleChange={updateOption}
                        value={option.text}
                    />
                </Field>
            );
        })}

        <div className="field-intro size-lg-12">
            <div className="size-lg-12">
                <button
                    className="button add-option green"
                    onClick={addOption}
                    type="button"
                >
                    <i className="fa fa-plus" />
                    Add option
                </button>
            </div>
        </div>
        <Field name="Can company edit?">
            <Checkbox
                handleChange={handleInputChange}
                checked={canCompanyEdit}
                name="canCompanyEdit"
            />
        </Field>
    </div>
);

export default MultiOptionForm;
