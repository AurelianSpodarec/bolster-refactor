import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import ButtonWrapper from '../../generic/button/presentational/ButtonWrapper';
import ActionButton from '../../generic/button/presentational/ActionButton';

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

        {showMoreServicesMesssage && (
            <p className="generic-text size-lg-12 switched">
                Looking for more service types? Check your{' '}
                <Link to="/company/subscription" className="switched">
                    subscriptions
                </Link>{' '}
                to add more!
            </p>
        )}
        <div className="size-lg-12">
            <ButtonWrapper alignment="right">
                <ActionButton
                    text="Cancel"
                    icon="times"
                    onClick={goBack}
                    size="small"
                    ambient="negative"
                />
                <ActionButton text="Confirm" icon="save" size="small" type="submit" />
            </ButtonWrapper>
        </div>
    </Form>
);

export default withRouter(EditClientForm);
