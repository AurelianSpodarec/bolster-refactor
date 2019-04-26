import React from 'react';
import { Link } from 'react-router-dom';

import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const EditDrawingOperative = ({
    operative,
    services,
    isFetching,
    handleMultiSelect,
    handleSubmit,
    serviceIDs,
    backUrl
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
                <BlockContainer>
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
                            Cancel
                        </Link>
                    </BlockButtonWrapper>
                </BlockContainer>
            </>
        );
    } else return <Loading />;
};

export default EditDrawingOperative;
