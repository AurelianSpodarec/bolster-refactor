import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Field from 'components/shared/generic/form/presentational/Field';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';

const AttachOperativeForm = ({
    location,
    handleSubmit,
    users,
    serviceOptions,
    checkedServices,
    companyUserIDs,
    handleChange,
    showMoreServicesMesssage,
    showClientServicesMessage,
    isTemplateFilteringEnabled,
    templateIDs,
    serviceAreas,
    services,
    getTemplatesForService,
}) => (
    <>
        <BlockHeading title="Operative details" />
        <Form className="generic-form size-lg-12" onSubmit={handleSubmit}>
            <div className="size-lg-12">
                <Field name="Select an operative" sizeClasses="size-lg-6 size-md-12" required>
                    <MultiSelect
                        name="companyUserIDs"
                        options={users}
                        value={companyUserIDs}
                        onChange={handleChange}
                        placeholder="-- select operatives --"
                        required
                        search
                    />
                </Field>

                <Field name="Service types" sizeClasses="size-lg-12" required>
                    <CheckboxListContainer
                        required
                        name="serviceIDs"
                        handleChange={handleChange}
                        options={serviceOptions}
                        hideDisabled
                        selectedOptions={checkedServices}
                    />
                </Field>

                <Field name="Enable Template Filtering" sizeClasses="size-lg-12">
                    <CheckboxContainer
                        name="isTemplateFilteringEnabled"
                        checked={isTemplateFilteringEnabled}
                        value={isTemplateFilteringEnabled}
                        handleChange={handleChange}
                        disabled={checkedServices.length === 0}
                    />
                </Field>

                {isTemplateFilteringEnabled && (
                    <>
                        {[...serviceAreas].sort().map(service => {
                            if (checkedServices.includes(service + '')) {
                                return (
                                    <Field
                                        key={service}
                                        name={services[service].name}
                                        sizeClasses="size-lg-12"
                                    >
                                        <CheckboxListContainer
                                            required
                                            name="templateIDs"
                                            handleChange={handleChange}
                                            options={getTemplatesForService(service)}
                                            hideDisabled
                                            selectedOptions={templateIDs}
                                        />
                                    </Field>
                                );
                            }
                        })}
                    </>
                )}
            </div>

            <BlockButtonWrapper>
                {showClientServicesMessage && (
                    <p className="generic-text size-lg-12">
                        Some of your service options have been omitted because you have not been
                        granted permissions for them on this drawing.
                    </p>
                )}
                {showMoreServicesMesssage && (
                    <p className="generic-text size-lg-12">
                        Looking for more service types? Check your{' '}
                        <Link to="/company/subscription">subscriptions</Link> to add more!
                    </p>
                )}

                <button className="button green">
                    <i className="fa fa-plus" />
                    Attach Operative
                </button>
                <Link to={location.pathname.replace('/add-operative', '')} className="button">
                    Cancel
                </Link>
            </BlockButtonWrapper>
        </Form>
    </>
);

export default withRouter(AttachOperativeForm);
