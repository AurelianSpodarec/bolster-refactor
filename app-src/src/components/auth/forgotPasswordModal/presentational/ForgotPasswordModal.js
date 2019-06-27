import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';

const ForgotPasswordModal = ({
    hideModal,
    handleChange,
    handleSubmit,
    email
}) => {
    return (
        <ModalOuterContainer>
            <BlockHeading
                title="Forgot Password"
                subTitle="Please enter the email that you use to log in."
            />
            <Form className="generic-form size-lg-12" onSubmit={handleSubmit}>
                <Field name="Email Address" sizeClasses="size-lg-6" required>
                    <TextInputContainer
                        value={email}
                        name="email"
                        type="email"
                        placeholder="email@example.com"
                        required
                        handleChange={handleChange}
                    />
                </Field>

                <div className="button-area size-lg-12">
                    <button
                        onClick={handleSubmit}
                        className="button green"
                        type="button"
                    >
                        <i className="far fa-check fa-fw" />
                        Confirm
                    </button>
                    <button
                        onClick={hideModal}
                        className="button red"
                        type="submit"
                    >
                        <i className="far fa-times fa-fw" />
                        Cancel
                    </button>
                </div>
            </Form>
        </ModalOuterContainer>
    );
};

export default ForgotPasswordModal;
