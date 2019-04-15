import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Field from 'components/shared/generic/form/presentational/Field';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';

const InviteCompanyForm = ({
    location,
    handleSubmit,
    companyCode,
    serviceOptions,
    checkedServices,
    handleChange,
    handleMultiselectChange
}) => (
    <Form className="size-lg-12" onSubmit={handleSubmit}>
        <Field name="Enter the company code" sizeClasses="size-lg-6">
            <TextInputContainer
                name="companyCode"
                value={companyCode}
                handleChange={handleChange}
                required
            />
        </Field>

        <Field name="Service types" sizeClasses="size-lg-12">
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
                Invite Company
            </button>
            <Link
                to={location.pathname.replace('/invite-company', '')}
                className="button"
            >
                Cancel
            </Link>
        </BlockButtonWrapper>
    </Form>
);

export default withRouter(InviteCompanyForm);
