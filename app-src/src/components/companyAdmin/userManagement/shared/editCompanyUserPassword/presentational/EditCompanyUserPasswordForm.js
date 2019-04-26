import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const EditCompanyUserPassword = ({
    handleSubmit,
    handleInputChange,
    password,
    confirmPassword,
    validatePassword,
    validateConfirmPassword,
    location,
    match
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="Enter Password">
                    <TextInputContainer
                        value={password}
                        name="password"
                        handleChange={handleInputChange}
                        type="password"
                        required
                        validate={validatePassword}
                    />
                </Field>
                <Field name="Confirm Password">
                    <TextInputContainer
                        value={confirmPassword}
                        name="confirmPassword"
                        handleChange={handleInputChange}
                        type="password"
                        required
                        validate={validateConfirmPassword}
                    />
                </Field>
            </div>
            <BlockButtonWrapper>
                <button className="button green">Confirm</button>
                <Link
                    to={location.pathname.replace(
                        `${match.params.id}/edit-password`,
                        ''
                    )}
                    className="button"
                >
                    Cancel
                </Link>
            </BlockButtonWrapper>
        </div>
    </Form>
);

export default withRouter(EditCompanyUserPassword);
