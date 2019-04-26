import React from 'react';
import { withRouter } from 'react-router-dom';

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
    handleMultiselectChange,
    companyID
}) => (
    <>
        <BlockHeading title="Services" />
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
                <button className="button green">
                    <i className="fa fa-plus" />
                    Add permissions
                </button>
                <ButtonContainer
                    to={location.pathname.replace(
                        `/add-permissions/${companyID}`,
                        ''
                    )}
                >
                    Cancel
                </ButtonContainer>
            </BlockButtonWrapper>
        </Form>
    </>
);

export default withRouter(AddCompanyPermissionsForm);
