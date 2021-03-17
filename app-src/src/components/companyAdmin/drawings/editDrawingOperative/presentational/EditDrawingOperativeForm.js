import React from 'react';

import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import Block from 'components/shared/generic/block/presentational/Block';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import Loading from 'components/shared/generic/misc/presentational/Loading';

const EditDrawingOperative = ({
    operative,
    services,
    serviceOptions,
    handleMultiSelect,
    handleSubmit,
    serviceIDs,
    backUrl,
    isTemplateFilteringEnabled,
    templateIDs,
    serviceAreas,
    getTemplatesForService,
    isFetching,
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
                                {[...serviceAreas].sort().map(service => (
                                    <Field
                                        key={service}
                                        name={services[service].name}
                                        sizeClasses="size-lg-12"
                                    >
                                        <CheckboxListContainer
                                            required
                                            name="templateIDs"
                                            handleChange={handleMultiSelect}
                                            options={getTemplatesForService(service).filter(
                                                item => !item.isDeleted,
                                            )}
                                            hideDisabled
                                            selectedOptions={templateIDs}
                                        />
                                    </Field>
                                ))}
                            </>
                        )}
                    </Form>
                    <BlockButtonWrapper>
                        <button onClick={handleSubmit} className="button green">
                            <i className="fa fa-check" />
                            Confirm Changes
                        </button>
                        <ButtonContainer to={backUrl}>Cancel</ButtonContainer>
                    </BlockButtonWrapper>
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
