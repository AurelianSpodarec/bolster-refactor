import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeadingWControls from '../../blockHeadingWControls/presentational/BlockHeadingWControls';
import Form from '../../form/containers/Form';
import Field from '../../form/presentational/Field';
import TextInputContainer from '../../form/containers/TextInputContainer';
import BlockButtonWrapper from '../../blockButtonWrappers/presentational/BlockButtonWrapper';

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
            <BlockHeadingWControls title="Edit User Details" />
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
                        <i className="fa fa-times" /> Cancel
                    </button>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default EditUserModal;
