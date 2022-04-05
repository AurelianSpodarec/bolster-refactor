import React from 'react';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';

const CreateOperativeForm = ({
    handleSubmit,
    handleInputChange,
    hideModal,
    firstName,
    lastName,
    email,
    phoneNumber,
    isPosting,
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <div className="size-lg-6 size-md-12">
                <Field name="First Name" required>
                    <TextInputContainer
                        name="firstName"
                        value={firstName}
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>

            <div className="size-lg-6 size-md-12">
                <Field name="Last Name" required>
                    <TextInputContainer
                        value={lastName}
                        name="lastName"
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>
        </div>

        <div className="size-lg-12">
            <div className="size-lg-6 size-md-12">
                <Field name="Email Address" required>
                    <TextInputContainer
                        value={email}
                        name="email"
                        type="email"
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>
            <div className="size-lg-6 size-md-12">
                <Field name="Phone Number">
                    <TextInputContainer
                        value={phoneNumber}
                        name="phoneNumber"
                        handleChange={handleInputChange}
                    />
                </Field>
            </div>
        </div>

        <BlockButtonWrapper>
            <ButtonWrapper alignment="right">
                <ActionButton text="Cancel" source="secondary" size="small" onClick={hideModal} />
                <ActionButton
                    text="Confirm"
                    size="small"
                    type="submit"
                    icon={isPosting ? 'spinner' : 'check'}
                    iconSpin={isPosting}
                    disabled={isPosting}
                />
            </ButtonWrapper>
        </BlockButtonWrapper>
    </Form>
);

export default CreateOperativeForm;
