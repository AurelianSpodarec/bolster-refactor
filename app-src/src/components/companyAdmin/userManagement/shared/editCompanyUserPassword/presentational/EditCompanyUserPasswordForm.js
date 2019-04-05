import React from 'react';
import { Link } from 'react-router-dom';

import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const EditCompanyUserPassword = ({
    handleSubmit,
    handleInputChange,
    password,
    confirmPassword,
    validate,
    type
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="Enter Password">
                    <TextInputContainer
                        value={password}
                        name="password"
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
                <Field name="Confirm Password">
                    <TextInputContainer
                        value={confirmPassword}
                        name="confirmPassword"
                        handleChange={handleInputChange}
                        required
                        validate={() => validate(confirmPassword)}
                    />
                </Field>
            </div>
            <BlockButtonWrapper>
                <button className="button green">
                    <i className="fa fa-plus" /> Confirm Edit
                </button>
                <Link to={`/users-management/${type}`} className="button">
                    <i className="fa fa-times" />
                    Cancel
                </Link>
            </BlockButtonWrapper>
        </div>
    </Form>
);

export default EditCompanyUserPassword;
