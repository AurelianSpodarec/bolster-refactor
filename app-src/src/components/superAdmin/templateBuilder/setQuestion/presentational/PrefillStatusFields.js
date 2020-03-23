import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import Select from 'components/shared/generic/form/presentational/Select';

const PrefillStatusFields = ({
    addOption,
    removeOption,
    updateOption,
    options,
    optionsForSelect,
    canCompanyEdit,
    handleInputChange,
    defaultValue,
    radio,
}) => (
    <div className="dropdown-create size-lg-12">
        {options.map((option, i) => (
            <Field key={option.id} name={`Option ${i + 1}`} required>
                {options.length > 1 && (
                    <button
                        className="button red icon-only delete-question"
                        onClick={() => removeOption(option.id)}
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
        ))}

        <div className="field-intro size-lg-12">
            <div className="size-lg-12">
                <button className="button add-option green" onClick={addOption} type="button">
                    <i className="fa fa-plus" />
                    Add option
                </button>
            </div>
        </div>
        <Field name="Can company edit?">
            <CheckboxContainer
                handleChange={handleInputChange}
                checked={canCompanyEdit}
                name="canCompanyEdit"
            />
        </Field>
        {radio && (
            <Field name="Default value">
                <Select
                    options={optionsForSelect}
                    onChange={handleInputChange}
                    value={defaultValue}
                    name="defaultValue"
                />
            </Field>
        )}
    </div>
);

export default PrefillStatusFields;
