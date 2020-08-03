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
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import { PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';
import { QUESTION_TYPE_NUMBERS } from 'constants/shared/templateBuilder';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';

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
    prefillStatuses,
    statusPrefills,
    handlePrefillStatusChange,
    handlePrefillStatusValueChange,
    showStatusPrefillOptions,
    prereqDropdownValues,
    isPrerequisiteMulti,
    ...otherFields
}) => {
    console.log('selectedPrereq');
    console.log('selectedPrereq');

    console.log(selectedPrereq);
    console.log(selectedPrereq);
    console.log('prereqval');
    console.log(prereqVal);

    console.log('prereqDropdownValues');
    console.log(prereqDropdownValues);

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

                {!!selectedPrereq && !selectedPrereq.options.length && (
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

                {!!selectedPrereq && selectedPrereq.options.length > 0 && (
                    <Field name="Prerequisite values">
                        <CheckboxListContainer
                            name="prereqDropdownValues"
                            handleChange={handleInputChange}
                            selectedOptions={prereqDropdownValues}
                            options={selectedPrereq.options.map(({ text }) => ({
                                value: text,
                                text,
                                disabled: false,
                            }))}
                        />
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
                {showStatusPrefillOptions && (
                    <div className="dropdown-create  size-lg-12">
                        <Field name="Prefill Based on status?">
                            <MultiSelect
                                search
                                options={statusOptions}
                                value={prefillStatuses}
                                name={'prefillStatuses'}
                                onChange={handlePrefillStatusChange}
                            />
                        </Field>
                        {+questionType.value === QUESTION_TYPE_NUMBERS.CHECKBOX &&
                        prefillStatuses.length
                            ? prefillStatuses.map((prefillStatus, index) => (
                                  <Field
                                      name={`${PIN_STATUS_TYPES[prefillStatus]} Value`}
                                      key={index}
                                  >
                                      <CheckboxContainer
                                          name="statusPrefills"
                                          checked={statusPrefills[prefillStatus]}
                                          handleChange={(name, value) => {
                                              handlePrefillStatusValueChange(prefillStatus, value);
                                          }}
                                      />
                                  </Field>
                              ))
                            : ''}

                        {prefillStatuses.length &&
                        +questionType.value !== QUESTION_TYPE_NUMBERS.CHECKBOX
                            ? prefillStatuses.map((prefillStatus, index) => (
                                  <Field
                                      name={`${PIN_STATUS_TYPES[prefillStatus]} Value`}
                                      key={index}
                                  >
                                      <TextInputContainer
                                          name="statusPrefills"
                                          handleChange={(name, value) => {
                                              handlePrefillStatusValueChange(prefillStatus, value);
                                          }}
                                          value={statusPrefills[prefillStatus]}
                                      />
                                  </Field>
                              ))
                            : ''}
                    </div>
                )}

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
