import React from 'react';

import ModalOuterContainer from '../containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from '../../blockButtonWrappers/presentational/BlockButtonWrapper';

const AddTemplateQuestionModal = ({
    questionTypeOptions,
    questionType,
    name,
    isRequired,
    handleInputChange,
    hideModal,
    handleSubmit
}) => (
    <ModalOuterContainer extraClasses="w-form">
        <Form onSubmit={handleSubmit}>
            <Field name="Question type">
                <Dropdown
                    name="questionType"
                    options={questionTypeOptions}
                    selectedOption={questionType}
                    handleChange={handleInputChange}
                />
            </Field>
            <Field name="Field name">
                <TextInputContainer
                    name="name"
                    value={name}
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
            <Field name="Field type">
                <Dropdown
                    name="fieldType"
                    options={questionTypeOptions}
                    selectedOption={questionType}
                    handleChange={handleInputChange}
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
