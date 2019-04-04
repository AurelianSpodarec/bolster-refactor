import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';

const AttachOperativeForm = ({
    location,
    handleSubmit,
    users,
    selectedUser,
    serviceOptions,
    checkedServices,
    handleChange,
    handleMultiselectChange
}) => (
    <Form className="size-lg-12" onSubmit={handleSubmit}>
        <Field name="Select an operative" sizeClasses="size-lg-6">
            <DropdownContainer
                placeholder="Select operative"
                name="CompanyUserID"
                options={users}
                selectedOption={selectedUser}
                handleChange={handleChange}
                required
            />
        </Field>

        <Field name="Service types" sizeClasses="size-lg-6">
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
                Add Operative
            </button>
            <Link
                to={location.pathname.replace('/add-operative', '')}
                className="button"
            >
                <i className="fa fa-times" /> Cancel
            </Link>
        </BlockButtonWrapper>
    </Form>
);

export default withRouter(AttachOperativeForm);
