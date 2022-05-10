import React from 'react';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';

const ChangeOwnershipForm = ({ companyCode, handleChange, handleSubmit, url }) => (
    <>
        <PageHeading leftChildren={true} title="Change Ownership" withBackButton />
        <BlockContainer>
            <Form className="generic-form" onSubmit={handleSubmit}>
                <Field name="Company code" sizeClasses="size-lg-6 size-md-12" required>
                    <TextInputContainer
                        value={companyCode}
                        name="companyCode"
                        handleChange={handleChange}
                        required
                    />
                </Field>
                <BlockButtonWrapper>
                    <ActionButton onClick={handleSubmit} text="Confirm" icon="check" />
                    <ButtonWrapper alignment="right">
                        <LinkButton
                            text="Cancel"
                            source="secondary"
                            href={url.replace('/change-ownership', '')}
                        />
                    </ButtonWrapper>
                </BlockButtonWrapper>
            </Form>
        </BlockContainer>
    </>
);

export default ChangeOwnershipForm;
