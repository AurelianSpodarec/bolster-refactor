import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeadingWControls from '../../blockHeadingWControls/presentational/BlockHeadingWControls';
import Form from '../../form/containers/Form';
import Field from '../../form/presentational/Field';
import TextInputContainer from '../../form/containers/TextInputContainer';
import BlockButtonWrapper from '../../blockButtonWrappers/presentational/BlockButtonWrapper';

const EditUserPasswordModal = ({
    password,
    confirmPassword,
    handleChange,
    handleSubmit,
    hideModal,
    validatePassword
}) => (
    <ModalOuterContainer>
        <BlockHeadingWControls title="Change Password" />
        <Form className="generic-form" onSubmit={handleSubmit}>
            <div className="size-lg-6">
                <Field name="Enter New Password">
                    <TextInputContainer
                        handleChange={handleChange}
                        name="password"
                        value={password}
                        type="password"
                        required
                    />
                </Field>
            </div>
            <div className="size-lg-6">
                <Field name="Confirm Password">
                    <TextInputContainer
                        type="password"
                        handleChange={handleChange}
                        name="confirmPassword"
                        value={confirmPassword}
                        validate={validatePassword}
                        required
                    />
                </Field>
            </div>
            <BlockButtonWrapper>
                <button className="button">Save</button>
                <button className="button" onClick={hideModal}>
                    <i className="fa fa-times" /> Cancel
                </button>
            </BlockButtonWrapper>
        </Form>
    </ModalOuterContainer>
);

export default EditUserPasswordModal;
