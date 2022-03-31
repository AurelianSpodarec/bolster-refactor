import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';
import ActionButton from '../../button/presentational/ActionButton';

const EditUserModal = ({
    firstName,
    lastName,
    email,
    phoneNumber,
    handleSubmit,
    hideModal,
    handleChange,
}) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title="Edit User Details" />
            <Form className="generic-form" onSubmit={handleSubmit}>
                <div className="size-lg-12">
                    <Field name="First name" required>
                        <TextInputContainer
                            handleChange={handleChange}
                            name={'firstName'}
                            value={firstName}
                            type="text"
                            required
                        />
                    </Field>
                </div>
                <div className="size-lg-12">
                    <Field name="Last name" required>
                        <TextInputContainer
                            handleChange={handleChange}
                            name={'lastName'}
                            value={lastName}
                            type="text"
                            required
                        />
                    </Field>
                </div>
                <div className="size-lg-12">
                    <Field name="Email address" required>
                        <TextInputContainer
                            handleChange={handleChange}
                            name={'email'}
                            value={email}
                            type="email"
                            required
                        />
                    </Field>
                </div>
                <div className="size-lg-12">
                    <Field name="Phone number">
                        <TextInputContainer
                            handleChange={handleChange}
                            name={'phoneNumber'}
                            value={phoneNumber}
                            type="text"
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
};

export default EditUserModal;
