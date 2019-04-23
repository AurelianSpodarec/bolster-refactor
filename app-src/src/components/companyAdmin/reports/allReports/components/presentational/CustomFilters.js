import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import NewSelect from 'components/shared/generic/form/presentational/NewSelect';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

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
    <div className="item size-lg-12">
        <Field name="Field Name">
            <button
                className="button red icon-only delete-question"
                type="button"
                onClick={removeField}
            >
                <i className="far fa-trash-alt" />
            </button>
            <NewSelect
                name="fieldName"
                value={selectedQuestions}
                options={questionOptions}
                onChange={handleChange}
            />
            <div className="options-list-block size-lg-12">
                {questionValues.map((option, i) => (
                    <Field
                        name={`Option ${i + 1}`}
                        key={option.id}
                        classes="option-item"
                    >
                        {questionValues.length > 1 && (
                            <button
                                className="button red icon-only delete-question"
                                type="button"
                                onClick={() => removeOption(option.id)}
                            >
                                <i className="far fa-trash-alt" />
                            </button>
                        )}
                        <TextInputContainer
                            name={option.id}
                            value={option.value}
                            handleChange={updateOption}
                            required
                        />
                    </Field>
                ))}
            </div>
            <BlockButtonWrapper>
                <button className="button" type="button" onClick={addOption}>
                    add option
                </button>
            </BlockButtonWrapper>
        </Field>
    </div>
);

export default CustomFilter;
