import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Field from 'components/shared/generic/form/presentational/Field';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const AddCompanyPermissionsForm = ({
    location,
    handleSubmit,
    serviceOptions,
    checkedServices,
    handleChange,
    companyID,
    showMoreServicesMesssage,
}) => (
    <>
        <BlockHeading title="Services" />
        <Form className="generic-form size-lg-12" onSubmit={handleSubmit}>
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
                {showMoreServicesMesssage && (
                    <p className="generic-text size-lg-12">
                        Looking for more service types? Check your{' '}
                        <Link to="/company/subscription">subscriptions</Link> to add more!
                    </p>
                )}

                <button className="button green">
                    <i className="fa fa-plus" />
                    Add permissions
                </button>
                <ButtonContainer
                    to={location.pathname.replace(`/add-permissions/${companyID}`, '')}
                >
                    Cancel
                </ButtonContainer>
            </BlockButtonWrapper>
        </Form>
    </>
);

export default withRouter(AddCompanyPermissionsForm);
