import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Field from 'components/shared/generic/form/presentational/Field';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';

const EditClientForm = ({
    location,
    handleSubmit,
    serviceOptions,
    checkedServices,
    handleMultiselectChange,
    match: {
        params: { clientID }
    }
}) => (
    <Form className="generic-form size-lg-12" onSubmit={handleSubmit}>
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
            <button type="submit" className="button green">
                Confirm
            </button>
            <Link
                to={location.pathname.replace(`/edit-client/${clientID}`, '')}
                className="button"
            >
                Cancel
            </Link>
        </BlockButtonWrapper>
    </Form>
);

export default withRouter(EditClientForm);
