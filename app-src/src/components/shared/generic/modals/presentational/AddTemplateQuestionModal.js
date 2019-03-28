import React from 'react';

import { isObjEmpty } from 'helpers/generic';

import ModalOuterContainer from '../containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from '../../blockButtonWrappers/presentational/BlockButtonWrapper';

const AddTemplateQuestionModal = ({
    questionTypeOptions,
    questionType,
    prereqOptions,
    prerequisite,
    name,
    isRequired,
    charLimit,
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
                    required
                />
            </Field>
            {!isObjEmpty(prereqOptions) && (
                <Field name="Prerequisite field?">
                    <DropdownContainer
                        name="prerequisite"
                        options={prereqOptions}
                        selectedOption={prerequisite}
                        handleChange={handleInputChange}
                    />
                </Field>
            )}
            {prerequisite && prerequisite.length && (
                <Field name="Prerequisite value">
                    <TextInputContainer
                        name="prerequisiteVal"
                        value={charLimit}
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
            <Field name="Is required">
                <input
                    name="isRequired"
                    type="checkbox"
                    value={isRequired}
                    onChange={handleInputChange}
                />
            </Field>
            <BlockButtonWrapper>
                <button className="button ">
                    <i className="fa fa-plus" /> Add Question
                </button>
                <button className="button" onClick={hideModal}>
                    <i className="fa fa-times" /> Cancel
                </button>
            </BlockButtonWrapper>
        </Form>
    </ModalOuterContainer>
);

export default AddTemplateQuestionModal;
