import React from 'react';

import { isObjEmpty } from 'helpers/generic';

import ModalOuterContainer from '../../../../shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from '../../../../shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const AddTemplateQuestionFormModal = ({
    questionTypeOptions,
    questionType,
    prereqOptions,
    selectedPrereq,
    prereqVal,
    name,
    isRequired,
    charLimit,
    isHidden,
    isPrefill,
    handleInputChange,
    hideModal,
    handleSubmit
}) => (
    <ModalOuterContainer extraClasses="w-form">
        <Form onSubmit={handleSubmit}>
            <Field name="Question type">
                <DropdownContainer
                    name="questionType"
                    options={questionTypeOptions}
                    selectedOption={questionType}
                    handleChange={handleInputChange}
                    withoutPlaceholder
                />
            </Field>
            {!isObjEmpty(prereqOptions) && (
                <Field name="Prerequisite field?">
                    <DropdownContainer
                        name="prereqUuid"
                        options={prereqOptions}
                        selectedOption={selectedPrereq}
                        handleChange={handleInputChange}
                    />
                </Field>
            )}
            {!!selectedPrereq && (
                <Field name="Prerequisite value">
                    <TextInputContainer
                        name="prereqVal"
                        value={prereqVal}
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            )}
            <Field name="Field name">
                <TextInputContainer
                    name="name"
                    value={name}
                    handleChange={handleInputChange}
                    required
                />
            </Field>
            <Field name="Character limit">
                <TextInputContainer
                    name="charLimit"
                    value={charLimit}
                    handleChange={handleInputChange}
                    required
                />
            </Field>
            <Field name="Required?">
                <input
                    name="isRequired"
                    type="checkbox"
                    checked={isRequired}
                    onChange={handleInputChange}
                />
            </Field>
            <Field name="Hidden?">
                <input
                    name="isHidden"
                    type="checkbox"
                    checked={isHidden}
                    onChange={handleInputChange}
                />
            </Field>
            <Field name="Prefill on create?">
                <input
                    name="isPrefill"
                    type="checkbox"
                    checked={isPrefill}
                    onChange={handleInputChange}
                />
            </Field>
            <BlockButtonWrapper>
                <button className="button ">
                    <i className="fa fa-plus" /> Save
                </button>
                <button className="button" onClick={hideModal}>
                    <i className="fa fa-times" /> Cancel
                </button>
            </BlockButtonWrapper>
        </Form>
    </ModalOuterContainer>
);

export default AddTemplateQuestionFormModal;
