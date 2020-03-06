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
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import Select from 'components/shared/generic/form/presentational/Select';

const TemplateQuestionFormModal = ({
    questionTypeOptions,
    questionType,
    prereqOptions,
    selectedPrereq,
    prereqVal,
    name,
    isRequired,
    isHidden,
    isPrefill,
    isRequiredVal,
    handleInputChange,
    hideModal,
    handleSubmit,
    action,
    statusOptions,
    prefillStatus,
    prefillStatusValue,
    ...otherFields
}) => {
    return (
        <ModalOuterContainer extraClasses="w-form">
            <BlockHeading title={`${action} question`} />
            <Form onSubmit={handleSubmit} className="generic-form">
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
                            name="prereqUUID"
                            options={prereqOptions}
                            selectedOption={selectedPrereq}
                            handleChange={handleInputChange}
                        />
                    </Field>
                )}
                {!!selectedPrereq && (
                    <Field name="Prerequisite value" required>
                        {selectedPrereq.isStatus ? (
                            <Select
                                name="prereqVal"
                                value={prereqVal}
                                options={statusOptions}
                                onChange={handleInputChange}
                                required
                            />
                        ) : (
                            <TextInputContainer
                                name="prereqVal"
                                value={prereqVal}
                                handleChange={handleInputChange}
                                required
                            />
                        )}
                    </Field>
                )}
                <Field name="Field name" required>
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
                <Field name="Required based on status?">
                    <Select
                        name="isRequiredVal"
                        value={isRequiredVal}
                        options={statusOptions}
                        onChange={(name, val) => {
                            handleInputChange(name, val);
                            handleInputChange('isRequired', false);
                        }}
                    />
                </Field>
                <Field name="Always Required?">
                    <CheckboxContainer
                        name="isRequired"
                        checked={isRequired}
                        handleChange={(name, val) => {
                            handleInputChange(name, val);
                            handleInputChange('isRequiredVal', null);
                        }}
                    />
                </Field>
                <Field name="Hidden?">
                    <CheckboxContainer
                        name="isHidden"
                        checked={isHidden}
                        handleChange={handleInputChange}
                    />
                </Field>
                <Field name="Prefill on create?">
                    <CheckboxContainer
                        name="isPrefill"
                        checked={isPrefill}
                        handleChange={handleInputChange}
                    />
                </Field>
                <Field name="Prefill Based on status?">
                    <Select 
                        name="prefillStatus"
                        onChange={handleInputChange}
                        options={statusOptions}
                        value={prefillStatus}
                    />
                </Field>
                {!!prefillStatus && 
                <Field name="Prefill Value">
                    <TextInputContainer
                        name="prefillStatusValue"
                        handleChange={handleInputChange}
                        value={prefillStatusValue}
                    />
                </Field>
                }
                <BlockButtonWrapper>
                    <button className="button green">
                        <i className="fa fa-plus" /> Add Question
                    </button>
                    <button className="button" onClick={hideModal}>
                        Cancel
                    </button>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default TemplateQuestionFormModal;
