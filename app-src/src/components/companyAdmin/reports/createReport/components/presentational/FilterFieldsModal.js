import React from 'react';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Select from 'components/shared/generic/form/presentational/Select';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';

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
    toggleShowFreeForm,
    validValueOptions = []
}) => (
    <ModalOuterContainer>
        <BlockHeading title="Add Filter" />
        {/* ? multiple fields in modal? */}
        {/* multi checkboxes for field name */}
        <div className="size-lg-12">
            <Field name="Question types" sizeClasses="size-lg-6" required>
                <Select
                    classes="full-width"
                    options={showFreeFormOptions}
                    value={showFreeForm ? 1 : 2}
                    onChange={toggleShowFreeForm}
                    omitPlaceholder
                />
            </Field>
            <Field name="Questions" sizeClasses="size-lg-6" required>
                <MultiSelect
                    classes="full-width"
                    search
                    options={questionOptions}
                    value={selectedQuestions}
                    name={'Options'}
                    onChange={handleChange}
                    required
                />
            </Field>
        </div>
        <div className="size-lg-12">
            {showFreeForm ? (
                <>
                    <Field name="Valid values" sizeClasses="size-lg-12">
                        {questionValues.map((option, i) => (
                            <Field
                                name={`Option ${i + 1}`}
                                key={option.id}
                                classes="option-item"
                                sizeClasses="size-lg-6"
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
                    </Field>
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
                </>
            ) : (
                <Field
                    name="Valid values"
                    sizeClasses="size-lg-12"
                    styles={{ minHeight: '200px' }}
                >
                    <MultiSelect
                        search
                        value={[]}
                        options={validValueOptions}
                        onChange={handleChange}
                    />
                </Field>
            )}
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
