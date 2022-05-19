import React from 'react';
import moment from 'moment';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';

const AddCreditsToDrawingForm = ({
    credits,
    expiryDate,
    handleCreditsChange,
    handleSubmit,
    handleClose,
}) => (
    <FlexModalOuter title="Add credits to drawing">
        <Form onSubmit={handleSubmit} className="generic-form flex-content-wrapper size-lg-12">
            <div className="flex-content">
                <p className="generic-text">
                    {`Adding ${credits} credit${
                        credits > 1 ? 's' : ''
                    } will extend your drawing expiry date to ${moment(expiryDate).format(
                        'DD/MM/YYYY HH:mm',
                    )}.`}
                </p>

                <div className="form-fields-container">
                    <div className="size-lg-12">
                        <div className="size-lg-6">
                            <Field name="Amount to add" required>
                                <TextInputContainer
                                    name="credits"
                                    value={credits}
                                    handleChange={handleCreditsChange}
                                    required
                                    type="number"
                                    validate={value =>
                                        value <= 0 || value % 1
                                            ? 'Please enter a positive integer.'
                                            : ''
                                    }
                                />
                            </Field>
                        </div>
                    </div>
                </div>
            </div>

            <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                <ActionButton
                    type="button"
                    text="Cancel"
                    onClick={handleClose}
                    source="secondary"
                />
                <ActionButton type="submit" text="Confirm" icon="check" />
            </ButtonWrapper>
        </Form>
    </FlexModalOuter>
);

export default AddCreditsToDrawingForm;
