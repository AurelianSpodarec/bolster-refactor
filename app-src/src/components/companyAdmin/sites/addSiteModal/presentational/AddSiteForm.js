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
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';

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
    setManufacturersForSite,
    message,
    dateToSend,
    selectedManufacturerOptions,
    manufacturerOptions,
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <div className="size-lg-6 size-md-12">
                <Field name="Site name" required>
                    <TextInputContainer
                        name="name"
                        value={name}
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>

            <div className="size-lg-6 size-md-12">
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
            <div className="size-lg-6 size-md-12">
                <Field name="Address line 1" required>
                    <TextInputContainer
                        value={addressLine1}
                        name="addressLine1"
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>

            <div className="size-lg-6 size-md-12">
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
            <div className="size-lg-6 size-md-12">
                <Field name="Postcode" required>
                    <TextInputContainer
                        value={postcode}
                        name="postcode"
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>
        </div>
        {isUsingBolsterLabels && <BolsterLabelExample name={name} hierarchy="Site" />}

        <div className="size-lg-12">
            <div className="size-lg-6 size-md-12">
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
                <div className="size-lg-6 size-md-12">
                    <Field name="Alert Message">
                        <TextAreaContainer
                            value={message}
                            name="message"
                            handleChange={handleInputChange}
                        />
                    </Field>
                </div>

                <div className="size-lg-6 size-md-12">
                    <Field name="Date to send">
                        <DatePickerPresentational
                            name="dateToSend"
                            selected={dateToSend}
                            onChange={handleDateChange}
                            placeholderText="Date"
                            showTimeSelect
                        />
                    </Field>
                </div>
            </div>
        )}
        <div className="size-lg-12">
            <div className="size-lg-6 size-md-12">
                <Field labelClasses="no-capitalise" name="Set manufacturer(s) for site?">
                    <CheckboxContainer
                        checked={setManufacturersForSite}
                        name="setManufacturersForSite"
                        text=""
                        handleChange={handleInputChange}
                    />
                </Field>
            </div>
        </div>
        {setManufacturersForSite && (
            <div className="size-lg-12">
                <Field labelClasses="no-capitalise" name="Manufacturer(s)">
                    <CheckboxListContainer
                        name="selectedManufacturerOptions"
                        text=""
                        handleChange={handleInputChange}
                        selectedOptions={selectedManufacturerOptions}
                        options={manufacturerOptions}
                    />
                </Field>
            </div>
        )}

        <BlockButtonWrapper>
            <button className="button green">Submit</button>
            <ButtonContainer handleClick={hideModal}>Cancel</ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);
export default AddSiteForm;
