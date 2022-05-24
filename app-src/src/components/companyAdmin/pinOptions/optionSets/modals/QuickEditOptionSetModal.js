import React from 'react';

import useQuickEditOptionSet from '../hooks/useQuickEditOptionSet';

import FlexModalOuter from '../../../../shared/generic/modals/presentational/FlexModalOuter';
import Form from '../../../../shared/generic/form/containers/Form';
import ButtonWrapper from '../../../../shared/generic/button/presentational/ButtonWrapper';
import ActionButton from '../../../../shared/generic/button/presentational/ActionButton';
import Field from '../../../../shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';

const QuickEditOptionSetModal = ({ set, hideModal }) => {
    const { form, handleChange, handleSubmit, isPosting } = useQuickEditOptionSet(set);
    return (
        <FlexModalOuter title={`Quick Edit prices for ${set.name}`}>
            <Form onSubmit={handleSubmit} className="generic-form flex-content-wrapper size-lg-12">
                <div className="flex-content">
                    <div className="form-fields-container">
                        <Field
                            name="Type the percentage to increase or decrese option prices in bulk"
                            required
                        >
                            <TextInputContainer
                                name="percentageIncrease"
                                value={form.percentageIncrease}
                                handleChange={handleChange}
                                placeholder="% price change (negatives allowed)"
                                type="number"
                                required
                            />
                        </Field>
                    </div>
                </div>

                <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                    <ActionButton text="Cancel" source="secondary" onClick={hideModal} />
                    <ActionButton
                        text="Confirm"
                        icon={isPosting ? 'spinner' : 'check'}
                        iconSpin={isPosting}
                        disabled={isPosting}
                        type="submit"
                    />
                </ButtonWrapper>
            </Form>
        </FlexModalOuter>
    );
};

export default QuickEditOptionSetModal;
