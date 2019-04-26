import React from 'react';
import { Link } from 'react-router-dom';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const ChangeOwnershipForm = ({
    companyCode,
    handleChange,
    handleSubmit,
    url
}) => (
    <>
        <PageHeading
            leftChildren={true}
            title="Change Ownership"
            withBackButton
        />
        <BlockContainer>
            <Form className="generic-form" onSubmit={handleSubmit}>
                <Field name="Company code" sizeClasses="size-lg-6">
                    <TextInputContainer
                        value={companyCode}
                        name="companyCode"
                        handleChange={handleChange}
                        required
                    />
                </Field>
                <BlockButtonWrapper>
                    <button className="button green" onClick={handleSubmit}>
                        Confirm
                    </button>
                    <Link
                        className="button"
                        to={url.replace('/change-ownership', '')}
                    >
                        Cancel
                    </Link>
                </BlockButtonWrapper>
            </Form>
        </BlockContainer>
    </>
);

export default ChangeOwnershipForm;
