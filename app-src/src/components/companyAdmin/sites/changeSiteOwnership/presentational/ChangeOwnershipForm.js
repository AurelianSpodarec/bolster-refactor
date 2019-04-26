import React from 'react';
import { Link } from 'react-router-dom';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

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
                    <ButtonContainer to={url.replace('/change-ownership', '')}>
                        Cancel
                    </ButtonContainer>
                </BlockButtonWrapper>
            </Form>
        </BlockContainer>
    </>
);

export default ChangeOwnershipForm;
