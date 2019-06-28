import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import BolsterLabelExample from 'components/shared/generic/form/presentational/BolsterLabelExample';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import DatePickerPresentational from 'components/shared/generic/form/presentational/DatePicker';

const FloorEditForm = ({
    handleSubmit,
    handleInputChange,
    handleDateChange,
    hideModal,
    name,
    isUsingBolsterLabels,
    isAlertShowing,
    alertMessage,
    alertDate
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <div className={`size-lg-${isUsingBolsterLabels ? '6' : '12'}`}>
                <Field name="floor name" required>
                    <TextInputContainer
                        name="name"
                        value={name}
                        handleChange={handleInputChange}
                        required
                    />
                </Field>

                <div className="size-lg-12">
                    <div className="size-lg-6">
                        <Field name="Send an alert?">
                            <CheckboxContainer
                                checked={isAlertShowing}
                                name="isAlertShowing"
                                text=""
                                handleChange={handleInputChange}
                            />
                        </Field>
                    </div>
                </div>

                {isAlertShowing && (
                    <div className="size-lg-12">
                        <div className="size-lg-6">
                            <Field name="Alert Message">
                                <TextAreaContainer
                                    value={alertMessage}
                                    name="alertMessage"
                                    handleChange={handleInputChange}
                                />
                            </Field>
                        </div>

                        <div className="size-lg-6">
                            <Field name="Date to send">
                                <DatePickerPresentational
                                    name="alertDate"
                                    selected={alertDate}
                                    onChange={handleDateChange}
                                    placeholderText="Date"
                                    showTimeSelect
                                />
                            </Field>
                        </div>
                    </div>
                )}
            </div>
            {isUsingBolsterLabels && (
                <div className="size-lg-6">
                    <BolsterLabelExample name={name} />
                </div>
            )}
        </div>

        <BlockButtonWrapper>
            <button className="button green">Confirm</button>
            <ButtonContainer handleClick={hideModal}>Cancel</ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);

export default FloorEditForm;
