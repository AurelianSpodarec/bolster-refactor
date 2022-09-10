import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components_DEPRECATED/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components_DEPRECATED/shared/generic/button/containers/ButtonContainer';
import Form from 'components_DEPRECATED/shared/generic/form/containers/Form';
import Field from 'components_DEPRECATED/shared/generic/form/presentational/Field';
import PhoneInput from 'components_DEPRECATED/shared/generic/form/presentational/PhoneInput';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import React from 'react';
import 'react-phone-number-input/style.css';

const SetupTwoFactor = ({ phoneNumber, setPhoneNumber, handleSubmit }) => (
    <>
        <PageHeading title="Set up Two Factor Authentication" withBackButton />
        <BlockContainer>
            <Form onSubmit={handleSubmit}>
                <Field name="Phone Number" sizeClasses="size-lg-6">
                    <PhoneInput
                        placeholder="Enter phone number"
                        name="phoneNumber"
                        value={phoneNumber}
                        handleChange={(_, value) => setPhoneNumber(value)}
                        defaultCountry="GB"
                        required
                        style={{ width: '100%' }}
                    />
                </Field>
                <BlockButtonWrapper>
                    <ButtonContainer type="submit">Submit</ButtonContainer>
                </BlockButtonWrapper>
            </Form>
        </BlockContainer>
    </>
);

export default SetupTwoFactor;
