import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const SubscriptionCredits = ({
    creditsToBuy,
    handleInputChange,
    totalCredits,
    showModal,
    costOfCredits
}) => (
    <div className="credits size-lg-12">
        <BlockHeading title="Credits" />
        <p className="size-lg-12">
            You currently have <strong>{totalCredits}</strong> credits available
            to use.
        </p>
        <Form className="generic-form">
            <Field name="Add Credits" htmlFor="add-credits">
                <TextInputContainer
                    name="creditsToBuy"
                    id="add-credits"
                    type="number"
                    classes="large"
                    placeholder="Enter number of credits..."
                    value={creditsToBuy}
                    handleChange={handleInputChange}
                />
            </Field>
        </Form>
        <p className="align-right size-lg-12">
            {creditsToBuy && `Total: £${costOfCredits * creditsToBuy}`}
        </p>
        <BlockButtonWrapper>
            <button className="button" onClick={showModal}>
                Buy
            </button>
        </BlockButtonWrapper>
    </div>
);

export default SubscriptionCredits;
