import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const SubscriptionCredits = ({ creditsToBuy, handleInputChange }) => (
    <>
        <PageHeading title="Credits" />
        <p>##You currently have 13 credits available to use##</p>
        <Form>
            <Field name="Add Credits" htmlFor="add-credits">
                <TextInputContainer
                    id="add-credits"
                    type="number"
                    placeholder="##Enter number of credits..##"
                    value={creditsToBuy}
                    handleChange={handleInputChange}
                />
            </Field>
            <BlockButtonWrapper>
                <button className="button">Buy</button>
                <p>##Total: £1,500##</p>
            </BlockButtonWrapper>
        </Form>
    </>
);

export default SubscriptionCredits;
