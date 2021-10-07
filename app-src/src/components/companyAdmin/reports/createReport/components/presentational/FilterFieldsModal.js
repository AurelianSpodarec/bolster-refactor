import React from 'react';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
// import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
// import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';

const FilterFieldsModal = ({
    showFreeForm,
    questionOptions,
    freeFormValues,
    optionOrientedOptions,
    optionOrientedVals,
    selectedQuestions,
    handleChange,
    handleFreeFormValChange,
    removeFreeFormVal,
    toggleAddFilter,
    handleSubmit,
    // exactMatch,
    // forceExactMatch
}) => {
    return (
        <BlockContainer noWhiteBackground={true}>
            <BlockHeading title="Add Filter" />
            <Field
                name="Question(s)"
                classes="no-caps"
                sizeClasses="size-lg-5 size-md-12"
                required
            >
                <MultiSelect
                    search
                    options={questionOptions}
                    value={selectedQuestions}
                    name={'selectedQuestions'}
                    onChange={handleChange}
                    required
                />
            </Field>
            <div className="size-lg-5 size-md-12">
                {showFreeForm ? (
                    <>
                        <Field
                            name="Answer"
                            classes="fields-inside"
                            sizeClasses="size-lg-12"
                        >
                            {freeFormValues.map(renderOption)}
                        </Field>
                    </>
                ) : (
                    <Field
                        name="Answer(s)"
                        classes="fields-inside no-caps"
                        sizeClasses="size-lg-12"
                    >
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

            {/* <Field 
                name="Exact match"
                classes="fields-inside"
                sizeClasses="size-lg-2 size-md-12"
            >
                {!forceExactMatch ? (
                    <CheckboxContainer
                       checked={exactMatch}
                       name="exactMatch"
                       text=""
                       handleChange={handleChange}
                    />  

                ) : (
                    <TooltipContainer containerSide="left" side="top" text="The specified field type can only be an exact match.">
                        <CheckboxContainer
                            disabled
                            checked
                            name="exactMatch"
                            text=""
                            handleChange={handleChange}
                            
                        />
                    </TooltipContainer>
                )
            }
                
              
            </Field> */}
            <BlockButtonWrapper>
                <button
                    className="button green"
                    type="submit"
                    onClick={handleSubmit}
                >
                    <i className="fa fa-save fa-fw" />
                    Submit
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
            <Field key={i} classes="option-item" sizeClasses="size-lg-12">
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
