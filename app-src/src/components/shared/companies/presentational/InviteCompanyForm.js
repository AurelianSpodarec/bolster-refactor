import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';

const InviteCompanyForm = ({
    location,
    handleSubmit,
    companyCode,
    serviceOptions,
    checkedServices,
    hierarchyType,
    handleChange,
    showMoreServicesMesssage,
}) => (
    <>
        <BlockHeading title="Company details" />
        <p className="generic-text intro-text size-lg-12">
            Please be aware that adding a company that already has permissions within this{' '}
            {hierarchyType} may end their current access
            <br /> until they accept this new invitation.
        </p>
        <Form className="generic-form size-lg-12" onSubmit={handleSubmit}>
            <Field name="Enter the company code" sizeClasses="size-lg-6 size-md-12" required>
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
                    handleChange={handleChange}
                    options={serviceOptions}
                    selectedOptions={checkedServices}
                    hideDisabled
                />
            </Field>

            <FlexWrapper>
                {showMoreServicesMesssage && (
                    <p className="generic-text size-lg-12">
                        Looking for more service types? Check your{' '}
                        <Link to="/company/subscription" className="switched">
                            subscriptions
                        </Link>{' '}
                        to add more!
                    </p>
                )}

                <ButtonWrapper alignment="right">
                    <LinkButton
                        source="secondary"
                        text="Cancel"
                        href={location.pathname.replace('/invite-company', '')}
                    />
                    <ActionButton type="submit" text="Confirm" icon="check" />
                </ButtonWrapper>
            </FlexWrapper>
        </Form>
    </>
);

export default withRouter(InviteCompanyForm);
