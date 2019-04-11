import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const SubscriptionCredits = ({
    creditsToBuy,
    handleInputChange,
    totalCredits,
    showModal,
    costOfCredits
}) => (
    <>
        <PageHeading title="Credits" />
        <span>You currently have {totalCredits} credits available to use.</span>
        <Form>
            <Field name="Add Credits" htmlFor="add-credits">
                <TextInputContainer
                    name="creditsToBuy"
                    id="add-credits"
                    type="number"
                    placeholder="Enter number of credits.."
                    value={creditsToBuy}
                    handleChange={handleInputChange}
                />
            </Field>
            <BlockButtonWrapper>
                <button className="button" onClick={showModal}>
                    Buy
                </button>
                {creditsToBuy && <p>Total : £{costOfCredits * creditsToBuy}</p>}
            </BlockButtonWrapper>
        </Form>
    </>
);

export default SubscriptionCredits;
