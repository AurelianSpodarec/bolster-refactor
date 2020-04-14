import React from 'react';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';

const AddCompanyAdminModal = ({ handleChange, handleSubmit, hideModal, form }) => {
    return (
        <ModalOuterContainer>
            <Form onSubmit={handleSubmit}>
                <Field name="First Name" required>
                    <TextInputContainer
                        handleChange={handleChange}
                        name="firstName"
                        value={form.firstName}
                        required
                    />
                </Field>
                <Field name="Last Name" required>
                    <TextInputContainer
                        handleChange={handleChange}
                        name="lastName"
                        value={form.lastName}
                        required
                    />
                </Field>
                <Field name="Email" required>
                    <TextInputContainer
                        handleChange={handleChange}
                        name="email"
                        value={form.email}
                        type="email"
                        required
                    />
                </Field>
                <Field name="Phone Number" required>
                    <TextInputContainer
                        handleChange={handleChange}
                        name="phoneNumber"
                        value={form.phoneNumber}
                        type="tel"
                    />
                </Field>
                <Field name="Password" required>
                    <TextInputContainer
                        handleChange={handleChange}
                        name="password"
                        value={form.password}
                        type="password"
                        required
                    />
                </Field>
                <Field name="Restrict Payments?">
                    <CheckboxContainer
                        name="shouldRestrictPayments"
                        checked={form.shouldRestrictPayments}
                        handleChange={handleChange}
                    />
                </Field>

                <BlockButtonWrapper>
                    <button type="submit" className="button green">
                        <i className="fa fa-plus" />
                        Submit
                    </button>
                    <button type="button" className="button red" onClick={hideModal}>
                        <i className="fa fa-times" />
                        Cancel
                    </button>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default AddCompanyAdminModal;
