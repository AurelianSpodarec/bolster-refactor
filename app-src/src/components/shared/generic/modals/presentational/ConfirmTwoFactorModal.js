import React, { useState } from 'react';
import BlockButtonWrapper from '../../blockButtonWrappers/presentational/BlockButtonWrapper';
import BlockHeading from '../../blockHeading/presentational/BlockHeading';
import ButtonContainer from '../../button/containers/ButtonContainer';
import Form from '../../form/containers/Form';
import TextInputContainer from '../../form/containers/TextInputContainer';
import Field from '../../form/presentational/Field';
import ModalOuterContainer from '../containers/ModalOuterContainer';

const ConfirmTwoFactorModal = ({ phoneNumber, handleSubmit }) => {
    const [code, setCode] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        handleSubmit(code);
    };

    return (
        <ModalOuterContainer>
            <BlockHeading title="Confirm" />
            <Form onSubmit={onSubmit}>
                <p>
                    We have sent a code via SMS to {phoneNumber}. Please enter the code below. This
                    code will only be active for up to 15 minutes.
                </p>
                <Field>
                    <TextInputContainer
                        value={code}
                        name="code"
                        handleChange={(_, value) => setCode(value)}
                        required
                    />
                </Field>
                <BlockButtonWrapper>
                    <ButtonContainer type="submit">Submit</ButtonContainer>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};
export default ConfirmTwoFactorModal;
