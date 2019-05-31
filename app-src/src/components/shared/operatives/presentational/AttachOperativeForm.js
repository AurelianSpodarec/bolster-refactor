import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const AttachOperativeForm = ({
    location,
    handleSubmit,
    users,
    selectedUser,
    serviceOptions,
    checkedServices,
    handleChange
}) => (
    <>
        <BlockHeading title="Operative details" />
        <Form className="generic-form size-lg-12" onSubmit={handleSubmit}>
            <Field name="Select an operative" sizeClasses="size-lg-6" required>
                <DropdownContainer
                    placeholder="-- select operative --"
                    name="companyUserID"
                    options={users}
                    selectedOption={selectedUser}
                    handleChange={handleChange}
                    required
                />
            </Field>

            <Field name="Service types" sizeClasses="size-lg-12" required>
                <CheckboxListContainer
                    required
                    name="serviceIDs"
                    handleChange={handleChange}
                    options={serviceOptions}
                    selectedOptions={checkedServices}
                />
            </Field>

            <BlockButtonWrapper>
                <button className="button green">
                    <i className="fa fa-plus" />
                    Attach Operative
                </button>
                <Link
                    to={location.pathname.replace('/add-operative', '')}
                    className="button"
                >
                    Cancel
                </Link>
            </BlockButtonWrapper>
        </Form>
    </>
);

export default withRouter(AttachOperativeForm);
