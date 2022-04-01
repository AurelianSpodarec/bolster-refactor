import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';
import ActionButton from '../../button/presentational/ActionButton';

const EditUserPasswordModal = ({
    password,
    confirmPassword,
    handleChange,
    handleSubmit,
    hideModal,
    validatePassword,
    validateConfirmPassword,
}) => (
    <ModalOuterContainer>
        <BlockHeading title="Change Password" />
        <Form className="generic-form" onSubmit={handleSubmit}>
            <div className="size-lg-6 size-md-12">
                <Field name="Enter New Password" required>
                    <TextInputContainer
                        handleChange={handleChange}
                        name="password"
                        value={password}
                        type="password"
                        validate={validatePassword}
                        includePasswordStrength
                        required
                    />
                </Field>
            </div>
            <div className="size-lg-6 size-md-12">
                <Field name="Confirm Password" required>
                    <TextInputContainer
                        type="password"
                        handleChange={handleChange}
                        name="confirmPassword"
                        value={confirmPassword}
                        validate={validateConfirmPassword}
                        required
                    />
                </Field>
            </div>
            <div className="size-lg-12">
                <ButtonWrapper alignment="right">
                    <ActionButton
                        text="Cancel"
                        onClick={hideModal}
                        source="secondary"
                        size="small"
                    />
                    <ActionButton text="Confirm" type="submit" icon="check" size="small" />
                </ButtonWrapper>
            </div>
        </Form>
    </ModalOuterContainer>
);

export default EditUserPasswordModal;
