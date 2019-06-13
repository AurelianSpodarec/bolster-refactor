import React from 'react';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Field from 'components/shared/generic/form/presentational/Field';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Select from 'components/shared/generic/form/presentational/Select';

const FilterFieldsModal = ({
    questionOptions,
    selectedQuestions,
    handleChange,
    addOption,
    removeOption,
    updateOption,
    questionValues,
    saveField,
    hideModal,
    showFreeForm,
    showFreeFormOptions,
    toggleShowFreeForm
}) => (
    <ModalOuterContainer>
        <BlockHeading title="Add Filter" />
        {/* ? multiple fields in modal? */}
        {/* multi checkboxes for field name */}
        <div className="size-lg-12">
            <div className="size-lg-12">
                <Field name="Question types">
                    <Select
                        classes="full-width"
                        options={showFreeFormOptions}
                        value={showFreeForm ? 1 : 2}
                        name={'Options'}
                        onChange={toggleShowFreeForm}
                        omitPlaceholder
                    />
                </Field>
            </div>
            <div className="size-lg-6">
                <Field name="Questions" required>
                    <CheckboxListContainer
                        classes="full-width"
                        options={questionOptions}
                        selectedOptions={selectedQuestions}
                        name={'Options'}
                        handleChange={handleChange}
                        required
                    />
                </Field>
            </div>
            <div className="size-lg-6">
                <Field name="Valid values">
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
                            />
                        </Field>
                    ))}
                    <BlockButtonWrapper>
                        <button
                            className="button green"
                            type="button"
                            onClick={addOption}
                        >
                            <i className="fa fa-plus fa-fw" />
                            add option
                        </button>
                    </BlockButtonWrapper>
                </Field>
            </div>
        </div>
        <BlockButtonWrapper>
            <button className="button green" type="submit" onClick={saveField}>
                <i className="fa fa-save fa-fw" />
                Save
            </button>
            <button className="button red" type="button" onClick={hideModal}>
                <i className="fa fa-times fa-fw" />
                Cancel
            </button>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default FilterFieldsModal;
