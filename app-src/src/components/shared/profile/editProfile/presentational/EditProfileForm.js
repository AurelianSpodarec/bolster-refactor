import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';

const EditProfileForm = ({
    handleInputChange,
    handleImageChange,
    handleSubmit,
    filesUploading,
    firstName,
    lastName,
    email,
    phoneNumber,
    profileImageS3Key,
    location
}) => {
    const backURL = location.pathname.includes('admin')
        ? '/admin/profile'
        : '/company/profile';
    return (
        <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
            <div className="size-lg-12">
                <div className="size-lg-6">
                    <Field name="First Name" required>
                        <TextInputContainer
                            name="firstName"
                            value={firstName}
                            handleChange={handleInputChange}
                            required
                        />
                    </Field>
                </div>
                <div className="size-lg-6">
                    <Field name="Email" required>
                        <TextInputContainer
                            value={email}
                            name="email"
                            type="email"
                            handleChange={handleInputChange}
                            required
                        />
                    </Field>
                </div>
            </div>

            <div className="size-lg-12">
                <div className="size-lg-6">
                    <Field name="Last Name" required>
                        <TextInputContainer
                            value={lastName}
                            name="lastName"
                            handleChange={handleInputChange}
                            required
                        />
                    </Field>
                </div>

                <div className="size-lg-6">
                    <Field name="Phone Number" required>
                        <TextInputContainer
                            value={phoneNumber}
                            name="phoneNumber"
                            handleChange={handleInputChange}
                            required
                        />
                    </Field>
                </div>
                <div className="size-lg-6">
                    <Field name="Upload New Profile Image">
                        <FileUploadContainer
                            name="profileImageS3Key"
                            value={profileImageS3Key}
                            handleChange={handleImageChange}
                            acceptedTypes={['image/*']}
                        />
                    </Field>
                </div>
            </div>

            <BlockButtonWrapper>
                <button disabled={filesUploading} className="button green">
                    {filesUploading ? 'Please wait...' : 'Confirm'}
                </button>
                <Link to={backURL} className="button">
                    Cancel
                </Link>
            </BlockButtonWrapper>
        </Form>
    );
};

export default withRouter(EditProfileForm);
