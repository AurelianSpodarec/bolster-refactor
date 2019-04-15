import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const EditUserModal = ({
    firstName,
    lastName,
    email,
    phoneNumber,
    handleSubmit,
    hideModal,
    handleChange
}) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title="Edit User Details" />
            <Form className="generic-form" onSubmit={handleSubmit}>
                <div className="size-lg-12">
                    <Field name="First name">
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
                    <Field name="Last name">
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
                    <Field name="Email address">
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
                            required
                        />
                    </Field>
                </div>
                <BlockButtonWrapper>
                    <button className="button" type="submit">
                        Save
                    </button>
                    <button className="button" onClick={hideModal}>
                        Cancel
                    </button>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default EditUserModal;
