import React from 'react';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Field from 'components/shared/generic/form/presentational/Field';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const FilterFieldsModal = ({
    questionOptions,
    selectedQuestions,
    handleChange,
    addOption,
    removeOption,
    updateOption,
    questionValues
}) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title="Add Field" />
            {/* ? multiple fields in modal? */}
            {/* multi checkboxes for field name */}
            <Field name="Questions">
                <CheckboxListContainer
                    options={questionOptions}
                    selectedOptions={selectedQuestions}
                    name={'Options'}
                    handleChange={handleChange}
                />
            </Field>
            <Field name="Valid values">
                {questionValues.map((option, i) => (
                    <Field
                        name={`Option ${i + 1}`}
                        key={option.id}
                        classes="option-item"
                        required
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
                <BlockButtonWrapper>
                    <button
                        className="button"
                        type="button"
                        onClick={addOption}
                    >
                        add option
                    </button>
                </BlockButtonWrapper>
            </Field>
            {/* textboxes for field value options */}
        </ModalOuterContainer>
    );
};

export default FilterFieldsModal;
