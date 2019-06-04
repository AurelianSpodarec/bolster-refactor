import React from 'react';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Field from 'components/shared/generic/form/presentational/Field';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const FilterFieldsModal = ({
    questionOptions,
    selectedQuestions,
    handleChange,
    addOption,
    removeOption,
    updateOption,
    questionValues,
    saveField
}) => (
    <ModalOuterContainer>
        <BlockHeading title="Add Field" />
        {/* ? multiple fields in modal? */}
        {/* multi checkboxes for field name */}
        <div className="size-lg-12">
            <div className="size-lg-6">
                <BlockHeading title="Questions" />
                <CheckboxListContainer
                    options={questionOptions}
                    selectedOptions={selectedQuestions}
                    name={'Options'}
                    handleChange={handleChange}
                />
            </div>
            <div className="size-lg-6">
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
            </div>
        </div>
        <BlockButtonWrapper>
            <ButtonContainer className="green" handleClick={saveField}>
                Save
            </ButtonContainer>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default FilterFieldsModal;
