import React from 'react';

import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const EditCompanyPermissionsForm = ({
    company,
    services,
    isFetching,
    handleMultiSelect,
    handleSubmit,
    serviceIDs,
    backUrl,
    type
}) => {
    if (!isFetching) {
        // const { userFirstName, userLastName } = company;
        return (
            company && (
                <>
                    <PageHeading
                        leftChildren={true}
                        title="Edit Company Permisions"
                    >
                        <BackButtonContainer />
                    </PageHeading>
                    <Breadcrumb
                        breadcrumbs={[{ text: type }, { text: 'Edit Company' }]}
                    />
                    <BlockContainer
                        isFetching={isFetching}
                        noData={company}
                        heading={`Edit ${company.companyName} permissions`}
                    >
                        <Form onSubmit={handleSubmit}>
                            <Field name="Services" required>
                                <CheckboxListContainer
                                    options={Object.values(services)}
                                    selectedOptions={serviceIDs}
                                    handleChange={handleMultiSelect}
                                    name="serviceIDs"
                                    required
                                />
                            </Field>
                        </Form>
                        <BlockButtonWrapper>
                            <button
                                onClick={handleSubmit}
                                className="button green"
                            >
                                <i className="fa fa-check" />
                                Confirm Changes
                            </button>

                            <ButtonContainer to={backUrl}>
                                Cancel
                            </ButtonContainer>
                        </BlockButtonWrapper>
                    </BlockContainer>
                </>
            )
        );
    } else return <Loading />;
};

export default EditCompanyPermissionsForm;
