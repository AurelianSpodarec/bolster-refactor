import React from 'react';

import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import Block from 'components/shared/generic/block/presentational/Block';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';

const EditDrawingOperative = ({
    operative,
    services,
    serviceOptions,
    handleMultiSelect,
    handleSubmit,
    serviceIDs,
    backUrl,
    isTemplateFilteringEnabled,
    serviceAreas,
    getTemplatesForService,
    isFetching,
    selectedTemplates,
}) => {
    if (!isFetching) {
        const { userFirstName, userLastName } = operative;

        return (
            <>
                <PageHeading
                    leftChildren={true}
                    title={`Edit Operative: ${userFirstName} ${userLastName}`}
                    withBackButton
                />
                <Block>
                    <Form onSubmit={handleSubmit}>
                        <Field name="Services" required>
                            <CheckboxListContainer
                                options={serviceOptions}
                                selectedOptions={serviceIDs}
                                handleChange={handleMultiSelect}
                                name="serviceIDs"
                                required
                                hideDisabled
                            />
                        </Field>

                        <Field name="Enable Template Filtering" sizeClasses="size-lg-12">
                            <CheckboxContainer
                                name="isTemplateFilteringEnabled"
                                checked={isTemplateFilteringEnabled}
                                value={isTemplateFilteringEnabled}
                                handleChange={handleMultiSelect}
                            />
                        </Field>

                        {isTemplateFilteringEnabled && (
                            <>
                                {[...serviceAreas].sort().map(service => {
                                    if (serviceIDs.includes(service + '')) {
                                        const options = getTemplatesForService(service).filter(
                                            item => !item.isDeleted,
                                        );

                                        return (
                                            <Field
                                                key={service}
                                                name={services[service].name}
                                                sizeClasses="size-lg-12"
                                            >
                                                <CheckboxListContainer
                                                    required
                                                    name="templateIDs"
                                                    handleChange={handleMultiSelect}
                                                    options={options}
                                                    selectedOptions={selectedTemplates}
                                                    hideDisabled
                                                />
                                            </Field>
                                        );
                                    }
                                    return null;
                                })}
                            </>
                        )}
                    </Form>

                    <FlexWrapper justify="end" gap={5}>
                        <LinkButton text="Cancel" source="secondary" size="small" href={backUrl} />
                        <ActionButton
                            text="Confirm"
                            icon="check"
                            size="small"
                            onClick={handleSubmit}
                        />
                    </FlexWrapper>
                </Block>
            </>
        );
    } else {
        return (
            <Block>
                <Loading />
            </Block>
        );
    }
};

export default EditDrawingOperative;
