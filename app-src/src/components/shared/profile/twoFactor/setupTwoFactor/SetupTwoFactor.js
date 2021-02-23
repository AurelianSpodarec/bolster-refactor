import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import React from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const SetupTwoFactor = ({ phoneNumber, setPhoneNumber, handleSubmit }) => (
    <>
        <PageHeading title="Set up Two Factor Authentication" />
        <BlockContainer>
            <Form onSubmit={handleSubmit}>
                <Field name="Phone Number" sizeClasses="size-lg-6">
                    <PhoneInput
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        onChange={setPhoneNumber}
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
