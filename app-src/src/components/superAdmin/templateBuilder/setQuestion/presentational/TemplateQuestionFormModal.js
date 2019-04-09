import React from 'react';

import { isObjEmpty } from 'helpers/generic';

import ModalOuterContainer from '../../../../shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from '../../../../shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import SpecificFieldsRoute from '../containers/SpecificFieldsRoute';

const AddTemplateQuestionFormModal = ({
    questionTypeOptions,
    questionType,
    prereqOptions,
    selectedPrereq,
    prereqVal,
    name,
    isRequired,
    isHidden,
    isPrefill,
    handleInputChange,
    hideModal,
    handleSubmit,
    action,
    ...otherFields
}) => (
    <ModalOuterContainer extraClasses="w-form">
        <BlockHeading title={`${action} question`} />
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
            <SpecificFieldsRoute
                questionType={questionType.value}
                handleInputChange={handleInputChange}
                {...otherFields}
            />
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
                    <i className="fa fa-plus" /> Set
                </button>
                <button className="button" onClick={hideModal}>
                    <i className="fa fa-times" /> Cancel
                </button>
            </BlockButtonWrapper>
        </Form>
    </ModalOuterContainer>
);

export default AddTemplateQuestionFormModal;
