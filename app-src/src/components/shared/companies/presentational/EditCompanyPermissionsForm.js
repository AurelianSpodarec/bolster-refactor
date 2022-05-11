import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Field from 'components/shared/generic/form/presentational/Field';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Select from 'components/shared/generic/form/presentational/Select';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';

const InviteCompanyForm = ({
    location,
    handleSubmit,
    serviceOptions,
    checkedServices,
    handleChange,
    templateUsageRule,
    templateRules,
    showMoreServicesMesssage,
    cancelURL = location.pathname.replace('/invite-company', ''),
}) => (
    <>
        <BlockHeading title="Company details" />

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
            <Field name="Set Template Usage Rule" required>
                <Select
                    placeholder="-- select rule --"
                    name={'templateUsageRule'}
                    options={templateRules}
                    value={templateUsageRule}
                    selectedOption={templateUsageRule}
                    onChange={handleChange}
                    required
                />
            </Field>

            <BlockButtonWrapper>
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
                    <LinkButton source="secondary" text="Cancel" href={cancelURL} size="small" />
                    <ActionButton type="submit" text="Confirm" icon="check" size="small" />
                </ButtonWrapper>
            </BlockButtonWrapper>
        </Form>
    </>
);

export default withRouter(InviteCompanyForm);
