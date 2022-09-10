import React from 'react';
import { useSelector } from 'react-redux';

import {
    ALERT_FREQUENCY_SUFFIX_VALUES,
    ALERT_FREQUENCY_TYPES,
    ALERT_FREQUENCY_VALUES,
    ALERT_METHOD_VALUES,
    HIERARCHY_TYPES,
} from 'constants/companyAdmin/enums';
import { enumFormat } from 'helpers/generic';
import { NUMBER_GREATER_THAN_ZERO } from 'helpers/regex';
import { alertsIsPosting } from 'selectors/companyAdmin/alerts';

import useCreateHierarchyAlert from '../hooks/useCreateHierarchyAlert';

import Form from 'components_DEPRECATED/shared/generic/form/containers/Form';
import Field from 'components_DEPRECATED/shared/generic/form/presentational/Field';
import TextInputContainer from 'components_DEPRECATED/shared/generic/form/containers/TextInputContainer';
import DatePickerContainer from 'components_DEPRECATED/shared/generic/form/containers/DatePickerContainer';
import Select from 'components_DEPRECATED/shared/generic/form/presentational/Select';
import TextAreaContainer from 'components_DEPRECATED/shared/generic/form/containers/TextAreaContainer';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import FlexModalOuter from 'components_DEPRECATED/shared/generic/modals/presentational/FlexModalOuter';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';

const CreateHierarchyAlertModal = ({ hierarchyType, hierarchyID, hideModal }) => {
    const {
        form: { name, description, method, date, frequencyType, frequencyAmount },
        handleChange,
        handleSubmit,
    } = useCreateHierarchyAlert(hierarchyType, hierarchyID);

    const isPosting = useSelector(alertsIsPosting);

    const methodOptions = enumFormat(ALERT_METHOD_VALUES);
    const frequencyTypeOptions = enumFormat(ALERT_FREQUENCY_VALUES);

    const frequencyAmountNum = parseInt(frequencyAmount);
    const frequencySuffix = `${ALERT_FREQUENCY_SUFFIX_VALUES[frequencyType].toLowerCase()}${
        frequencyAmountNum > 1 ? 's' : ''
    }`;

    return (
        <FlexModalOuter title={`Create ${HIERARCHY_TYPES[hierarchyType]} alert`}>
            <Form className="generic-form flex-content-wrapper" onSubmit={handleSubmit}>
                <div className="flex-content">
                    <div className="form-fields-container">
                        <div className="size-lg-12">
                            <Field name="Name" required>
                                <TextInputContainer
                                    handleChange={handleChange}
                                    name="name"
                                    value={name}
                                    required
                                />
                            </Field>

                            <Field name="Description" required>
                                <TextAreaContainer
                                    handleChange={handleChange}
                                    name="description"
                                    value={description}
                                    required
                                />
                            </Field>

                            <div className="size-lg-6">
                                <Field name="Alert Method" required>
                                    <Select
                                        value={method}
                                        onChange={handleChange}
                                        name="method"
                                        options={methodOptions}
                                        omitPlaceholder
                                        required
                                    />
                                </Field>
                            </div>

                            <div className="size-lg-6">
                                <Field name="Date" required>
                                    <DatePickerContainer
                                        selected={date}
                                        onChange={val => handleChange('date', val)}
                                        name="date"
                                        required
                                    />
                                </Field>
                            </div>

                            <div className="size-lg-6">
                                <Field name="Frequency Type" required>
                                    <Select
                                        value={frequencyType}
                                        onChange={handleChange}
                                        name="frequencyType"
                                        options={Object.values(frequencyTypeOptions)}
                                        omitPlaceholder
                                        required
                                        forceListAbove={
                                            frequencyType === ALERT_FREQUENCY_TYPES.ONCE
                                        }
                                    />
                                </Field>
                            </div>

                            {frequencyType !== ALERT_FREQUENCY_TYPES.ONCE && (
                                <>
                                    <div className="size-lg-6">
                                        <Field name="Frequency" required>
                                            <TextInputContainer
                                                type="number"
                                                name="frequencyAmount"
                                                value={frequencyAmount}
                                                handleChange={handleChange}
                                                minNum={1}
                                                validationRegExp={NUMBER_GREATER_THAN_ZERO}
                                                required
                                            />
                                        </Field>
                                    </div>
                                </>
                            )}

                            <Field styles={{ minHeight: 0 }}>
                                <p className="size-lg-12 info-message">
                                    {+frequencyType === ALERT_FREQUENCY_TYPES.ONCE
                                        ? 'Alert will be sent once.'
                                        : `Alert will be sent every ${
                                              frequencyAmountNum > 1 ? `${frequencyAmount} ` : ''
                                          }${frequencySuffix}.`}
                                </p>
                            </Field>
                        </div>
                    </div>
                </div>

                <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                    <ActionButton source="secondary" text="Cancel" onClick={hideModal} />
                    <ActionButton
                        type="submit"
                        text={isPosting ? 'Creating...' : 'Confirm'}
                        icon={isPosting ? 'spinner' : 'check'}
                        iconSpin={isPosting}
                        disabled={isPosting}
                    />
                </ButtonWrapper>
            </Form>
        </FlexModalOuter>
    );
};

export default CreateHierarchyAlertModal;
