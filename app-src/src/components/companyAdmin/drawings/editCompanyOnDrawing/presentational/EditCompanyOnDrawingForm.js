import React from 'react';
import { Link } from 'react-router-dom';

import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const EditCompanyOnDrawingForm = ({
    company,
    services,
    isFetching,
    handleMultiSelect,
    handleSubmit,
    serviceIDs,
    backUrl
}) => {
    if (!isFetching) {
        // const { userFirstName, userLastName } = company;
        return (
            <BlockContainer>
                <Breadcrumb
                    breadcrumbs={[
                        { text: 'Drawings' },
                        { text: 'Edit Company' }
                    ]}
                />
                <PageHeading title={'Change this'} />
                <Form onSubmit={handleSubmit}>
                    <Field name="Services">
                        <CheckboxListContainer
                            options={Object.values(services)}
                            selectedOptions={serviceIDs}
                            handleChange={handleMultiSelect}
                            name="serviceIDs"
                        />
                    </Field>
                </Form>
                <BlockButtonWrapper>
                    <button onClick={handleSubmit} className="button green">
                        <i className="fa fa-plus" />
                        Confirm Changes
                    </button>
                    <Link to={backUrl} className="button">
                        <i className="fa fa-times" /> Cancel
                    </Link>
                </BlockButtonWrapper>
            </BlockContainer>
        );
    } else return <Loading />;
};

export default EditCompanyOnDrawingForm;
