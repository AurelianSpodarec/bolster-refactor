import React from 'react';
import { Link } from 'react-router-dom';

import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const EditProfileForm = ({
    handleInputChange,
    handleSubmit,
    firstName,
    lastName,
    email,
    phoneNumber,
    error,
    isFetching
}) => (
    <BlockContainer
        heading="Edit Profile"
        error={error}
        isFetching={isFetching}
        isEmpty={!email}
    >
        <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
            <div className="size-lg-12">
                <div className="size-lg-6">
                    <Field name="First Name">
                        <TextInputContainer
                            name="firstName"
                            value={firstName}
                            handleChange={handleInputChange}
                            required
                        />
                    </Field>
                </div>
                <div className="size-lg-6">
                    <Field name="Last Name">
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
                <div className="size-lg-6">
                    <Field name="Email">
                        <TextInputContainer
                            value={email}
                            name="email"
                            handleChange={handleInputChange}
                        />
                    </Field>
                </div>
                <div className="size-lg-6">
                    <Field name="Phone Number">
                        <TextInputContainer
                            value={phoneNumber}
                            name="phoneNumber"
                            handleChange={handleInputChange}
                            required
                        />
                    </Field>
                </div>
            </div>

            <BlockButtonWrapper>
                <button className="button green">Confirm</button>
                <Link to={'/company/profile'} className="button">
                    Cancel
                </Link>
            </BlockButtonWrapper>
        </Form>
    </BlockContainer>
);

export default EditProfileForm;
