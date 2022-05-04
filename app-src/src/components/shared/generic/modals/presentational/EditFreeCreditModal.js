import React from 'react';
import BlockHeading from '../../blockHeading/presentational/BlockHeading';
import CheckboxContainer from '../../form/containers/CheckboxContainer';
import Form from '../../form/containers/Form';
import Field from '../../form/presentational/Field';

import ModalOuterContainer from '../containers/ModalOuterContainer';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';
import ActionButton from '../../button/presentational/ActionButton';

const EditFreeCreditModal = ({
    company,
    shouldReceiveFreeCredit,
    handleChange,
    handleSubmit,
    closeModal,
}) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title={`Edit ${company.name}'s free credit`} />

            <Form className="generic-form" onSubmit={handleSubmit}>
                <Field name="Should receive 1 free credit per 10 purchased">
                    <CheckboxContainer
                        checked={shouldReceiveFreeCredit}
                        handleChange={() => handleChange(!shouldReceiveFreeCredit)}
                        name="shouldReceiveFreeCredit"
                    />
                </Field>

                <div className="size-lg-12">
                    <ButtonWrapper alignment="right">
                        <ActionButton
                            text="Cancel"
                            onClick={closeModal}
                            source="secondary"
                            size="small"
                        />
                        <ActionButton text="Confirm" type="submit" icon="check" size="small" />
                    </ButtonWrapper>
                </div>
            </Form>
        </ModalOuterContainer>
    );
};

export default EditFreeCreditModal;
