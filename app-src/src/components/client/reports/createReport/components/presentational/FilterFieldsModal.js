import React from 'react';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const FilterFieldsModal = ({
    showFreeForm,
    questionOptions,
    freeFormValues,
    optionOrientedOptions,
    optionOrientedVals,
    selectedQuestions,
    handleChange,
    handleFreeFormValChange,
    addFreeFormVal,
    removeFreeFormVal,
    toggleAddFilter,
    handleSubmit
}) => {
    return (
        <BlockContainer noWhiteBackground={true}>
            <BlockHeading title="Add Filter" />
            <Field name="Questions" sizeClasses="size-lg-6" required>
                <MultiSelect
                    search
                    options={questionOptions}
                    value={selectedQuestions}
                    name={'selectedQuestions'}
                    onChange={handleChange}
                    required
                />
            </Field>
            <div className="size-lg-6">
                {showFreeForm ? (
                    <>
                        <Field name="Valid values" sizeClasses="size-lg-12">
                            {freeFormValues.map(renderOption)}
                        </Field>
                        <BlockButtonWrapper>
                            <button
                                className="button green"
                                type="button"
                                onClick={addFreeFormVal}
                            >
                                <i className="fa fa-plus fa-fw" />
                                add option
                            </button>
                        </BlockButtonWrapper>
                    </>
                ) : (
                    <Field name="Valid values" sizeClasses="size-lg-12">
                        <MultiSelect
                            search
                            name="optionOrientedVals"
                            value={optionOrientedVals}
                            options={optionOrientedOptions}
                            onChange={handleChange}
                        />
                    </Field>
                )}
            </div>
            <BlockButtonWrapper>
                <button
                    className="button green"
                    type="submit"
                    onClick={handleSubmit}
                >
                    <i className="fa fa-save fa-fw" />
                    Save
                </button>
                <button
                    className="button red"
                    type="button"
                    onClick={toggleAddFilter}
                >
                    <i className="fa fa-times fa-fw" />
                    Cancel
                </button>
            </BlockButtonWrapper>
        </BlockContainer>
    );

    function renderOption(value, i) {
        return (
            <Field
                name={`Option ${i + 1}`}
                key={i}
                classes="option-item"
                sizeClasses="size-lg-12"
            >
                {freeFormValues.length > 1 && (
                    <button
                        className="button red icon-only delete-question"
                        type="button"
                        onClick={() => removeFreeFormVal(i)}
                    >
                        <i className="far fa-trash-alt" />
                    </button>
                )}
                <TextInputContainer
                    name={i}
                    value={value}
                    handleChange={handleFreeFormValChange}
                />
            </Field>
        );
    }
};

export default FilterFieldsModal;
