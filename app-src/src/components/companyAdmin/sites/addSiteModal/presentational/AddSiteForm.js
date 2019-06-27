import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import BolsterLabelExample from 'components/shared/generic/form/presentational/BolsterLabelExample';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import DatePickerPresentational from 'components/shared/generic/form/presentational/DatePicker';

const AddSiteForm = ({
    handleSubmit,
    handleInputChange,
    handleDateChange,
    hideModal,
    name,
    client,
    addressLine1,
    addressLine2,
    postcode,
    isUsingBolsterLabels,
    isAlertShowing,
    alertMessage,
    alertDate
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="Site name" required>
                    <TextInputContainer
                        name="name"
                        value={name}
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>

            <div className="size-lg-6">
                <Field name="Client name">
                    <TextInputContainer
                        value={client}
                        name="client"
                        handleChange={handleInputChange}
                    />
                </Field>
            </div>
        </div>

        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="Address line 1">
                    <TextInputContainer
                        value={addressLine1}
                        name="addressLine1"
                        handleChange={handleInputChange}
                    />
                </Field>
            </div>

            <div className="size-lg-6">
                <Field name="Address line 2">
                    <TextInputContainer
                        value={addressLine2}
                        name="addressLine2"
                        handleChange={handleInputChange}
                    />
                </Field>
            </div>
        </div>

        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="Postcode">
                    <TextInputContainer
                        value={postcode}
                        name="postcode"
                        handleChange={handleInputChange}
                    />
                </Field>
            </div>
        </div>
        {isUsingBolsterLabels && <BolsterLabelExample name={name} />}

        <div className="size-lg-12" style={{ display: 'none' }}>
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

        <BlockButtonWrapper>
            <button className="button green">
                <i className="fa fa-plus" /> Add Site
            </button>
            <ButtonContainer handleClick={hideModal}>Cancel</ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);
export default AddSiteForm;
