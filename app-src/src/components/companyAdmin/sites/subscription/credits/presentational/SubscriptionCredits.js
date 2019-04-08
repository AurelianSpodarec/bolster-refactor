import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const SubscriptionCredits = () => {
    return (
        <BlockContainer>
            <PageHeading title="Credits" />
            <p>##You currently have 13 credits available to use##</p>
            <Form>
                <Field name="Add Credits">
                    <TextInputContainer placeholder="##Enter number of credits..##" />
                </Field>
                <p>##Total: £1,500##</p>
                <BlockButtonWrapper>
                    <button className="button">Buy</button>
                </BlockButtonWrapper>
            </Form>
        </BlockContainer>
    );
};

export default SubscriptionCredits;
