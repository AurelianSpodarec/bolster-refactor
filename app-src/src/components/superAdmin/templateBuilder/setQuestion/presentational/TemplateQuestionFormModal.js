import React from 'react';

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

const TemplateQuestionFormModal = ({
    questionTypeOptions,
    questionType,
    prereqOptions = [],
    selectedPrereq,
    prereqValueOptions,
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
    useManufacturingPrereqOptions,
    setUseManufacturingPrerqOptions,
    shouldShowUseManufacturingPrereqOptsSwitch,
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
                        omitPlaceholder
                    />
                </Field>

                {prereqOptions.length > 0 && (
                    <Field name="Prerequisite field?">
                        <Select
                            search
                            name="prereqUUID"
                            options={prereqOptions}
                            value={selectedPrereq}
                            onChange={(name, val) => {
                                handleInputChange(name, val);
                                handleInputChange('prereqDropdownValues', []);
                            }}
                        />
                    </Field>
                )}

                {shouldShowUseManufacturingPrereqOptsSwitch && (
                    <Field name="Enable Manufacturing options?">
                        <CheckboxContainer
                            name="enableManOptions"
                            checked={useManufacturingPrereqOptions}
                            handleChange={(_, val) => {
                                setUseManufacturingPrerqOptions(val);
                                handleInputChange('prereqDropdownValues', []);
                            }}
                        />
                    </Field>
                )}

                {prereqValueOptions.length > 0 && (
                    <Field name="Prerequisite values">
                        <MultiSelect
                            search
                            name="prereqDropdownValues"
                            onChange={handleInputChange}
                            value={prereqDropdownValues}
                            options={prereqValueOptions}
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
                        {questionType === QUESTION_TYPE_NUMBERS.CHECKBOX && prefillStatuses.length
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

                        {prefillStatuses.length && questionType !== QUESTION_TYPE_NUMBERS.CHECKBOX
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
