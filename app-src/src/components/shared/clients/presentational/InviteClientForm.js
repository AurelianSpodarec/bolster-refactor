import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Field from 'components/shared/generic/form/presentational/Field';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const InviteClientForm = ({
    location,
    handleSubmit,
    serviceOptions,
    checkedServices,
    handleChange,
    handleMultiselectChange,
    firstName,
    lastName,
    email,
    phoneNumber,
    companyName
}) => (
    <Form className="size-lg-12" onSubmit={handleSubmit}>
        <BlockHeading />
        <Field name="Invite Client">
            <p className="generic-text size-lg-12">
                Please enter the email address of the user you wish to invite.
                If the user does not have a Bolster systems account, they will
                be prompted to create one to accepted your invitation.
            </p>
        </Field>
        <div className="size-lg-12">
            <Field name="Email address" sizeClasses="size-lg-6">
                <TextInputContainer
                    name="email"
                    value={email}
                    handleChange={handleChange}
                    required
                />
            </Field>
        </div>

        <Field name="First name" sizeClasses="size-lg-4">
            <TextInputContainer
                name="firstName"
                value={firstName}
                handleChange={handleChange}
                required
            />
        </Field>

        <Field name="Last name" sizeClasses="size-lg-4">
            <TextInputContainer
                name="lastName"
                value={lastName}
                handleChange={handleChange}
                required
            />
        </Field>

        <Field name="Phone number" sizeClasses="size-lg-4">
            <TextInputContainer
                name="phoneNumber"
                value={phoneNumber}
                handleChange={handleChange}
                required
            />
        </Field>

        <Field name="Company name" sizeClasses="size-lg-4">
            <TextInputContainer
                name="companyName"
                value={companyName}
                handleChange={handleChange}
                required
            />
        </Field>

        <Field name="Service types" sizeClasses="size-lg-12">
            <p className="generic-text size-lg-12">
                Select the services the client should have access to:
            </p>
            <CheckboxListContainer
                required
                name="serviceIDs"
                handleChange={handleMultiselectChange}
                options={serviceOptions}
                selectedOptions={checkedServices}
            />
        </Field>

        <BlockButtonWrapper>
            <button className="button green">
                <i className="fa fa-plus" />
                Invite Client
            </button>
            <Link
                to={location.pathname.replace('/invite-client', '')}
                className="button"
            >
                <i className="fa fa-times" /> Cancel
            </Link>
        </BlockButtonWrapper>
    </Form>
);

export default withRouter(InviteClientForm);
