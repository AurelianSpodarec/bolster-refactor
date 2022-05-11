import React from 'react';
import moment from 'moment';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';

const AddCreditsToDrawingForm = ({
    credits,
    expiryDate,
    handleCreditsChange,
    handleSubmit,
    handleClose,
}) => (
    <ModalOuterContainer>
        <BlockHeading
            title="Add credits to drawing"
            subTitle={`Adding ${credits} credit${
                credits > 1 ? 's' : ''
            } will extend your drawing expiry date to ${moment(expiryDate).format(
                'DD/MM/YYYY HH:mm',
            )}.`}
        />

        <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
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
                                value <= 0 || value % 1 ? 'Please enter a positive integer.' : ''
                            }
                        />
                    </Field>
                </div>
            </div>

            <BlockButtonWrapper>
                <ActionButton type="submit" text="Confirm" icon="check" />
                <ActionButton
                    type="button"
                    text="Cancel"
                    onClick={handleClose}
                    source="secondary"
                />
            </BlockButtonWrapper>
        </Form>
    </ModalOuterContainer>
);

export default AddCreditsToDrawingForm;
