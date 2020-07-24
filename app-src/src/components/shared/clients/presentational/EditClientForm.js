import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Field from 'components/shared/generic/form/presentational/Field';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';

const EditClientForm = ({
    handleSubmit,
    serviceOptions,
    checkedServices,
    goBack,
    handleChange,
    showMoreServicesMesssage,
}) => (
    <Form className="generic-form size-lg-12" onSubmit={handleSubmit}>
        <Field name="Service types" sizeClasses="size-lg-12" required>
            <CheckboxListContainer
                required
                name="serviceIDs"
                handleChange={handleChange}
                options={serviceOptions}
                selectedOptions={checkedServices}
                hideDisabled
            />
        </Field>

        <BlockButtonWrapper>
            {showMoreServicesMesssage && (
                <p className="generic-text size-lg-12">
                    Looking for more service types? Check your{' '}
                    <Link to="/company/subscription">subscriptions</Link> to add more!
                </p>
            )}

            <button type="submit" className="button green">
                Confirm
            </button>
            <button type="button" className="button" onClick={() => goBack()}>
                Cancel
            </button>
        </BlockButtonWrapper>
    </Form>
);

export default withRouter(EditClientForm);
