import React from 'react';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const CreateCompanyAdminForm = ({
    handleSubmit,
    handleInputChange,
    name,
    addressLine1,
    addressLine2,
    postcode,
    password,
    confirmPassword
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="Building name">
                    <TextInputContainer
                        name="name"
                        value={name}
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>

            <div className="size-lg-6">
                <Field name="Address Line 1">
                    <TextInputContainer
                        value={addressLine1}
                        name="addressLine1"
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>
        </div>

        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="Address Line 2">
                    <TextInputContainer
                        value={addressLine2}
                        name="addressLine2"
                        handleChange={handleInputChange}
                    />
                </Field>
            </div>

            <div className="size-lg-6">
                <Field name="Postcode">
                    <TextInputContainer
                        value={postcode}
                        name="postcode"
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>

            <div className="size-lg-6">
                <Field name="Password">
                    <TextInputContainer
                        value={password}
                        name="password"
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>

            <div className="size-lg-6">
                <Field name="Confirm Password">
                    <TextInputContainer
                        value={confirmPassword}
                        name="confirmPassword"
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>
        </div>

        <BlockButtonWrapper>
            <button className="button green">
                <i className="fa fa-plus" /> Create Company Admin
            </button>
            <a className="button" href="/users-management/company-admins">
                Cancel
            </a>
        </BlockButtonWrapper>
    </Form>
);

export default CreateCompanyAdminForm;
