import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Field from 'components/shared/generic/form/presentational/Field';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const InviteCompanyForm = ({
    location,
    handleSubmit,
    companyCode,
    serviceOptions,
    checkedServices,
    hierarchyType,
    handleChange,
    handleMultiselectChange
}) => (
    <>
        <BlockHeading title="Company details" />
        <p className="generic-text intro-text size-lg-12">
            Please be aware that adding a company that already has permissions
            within this {hierarchyType} may end their current access
            <br /> until they accept this new invitation.
        </p>
        <Form className="generic-form size-lg-12" onSubmit={handleSubmit}>
            <Field
                name="Enter the company code"
                sizeClasses="size-lg-6"
                required
            >
                <TextInputContainer
                    name="companyCode"
                    value={companyCode}
                    handleChange={handleChange}
                    required
                />
            </Field>

            <Field name="Service types" sizeClasses="size-lg-12" required>
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
    </>
);

export default withRouter(InviteCompanyForm);
