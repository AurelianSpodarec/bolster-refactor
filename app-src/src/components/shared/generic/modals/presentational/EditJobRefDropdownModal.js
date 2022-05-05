import React from 'react';
import BlockHeading from '../../blockHeading/presentational/BlockHeading';
import CheckboxContainer from '../../form/containers/CheckboxContainer';
import Form from '../../form/containers/Form';
import Field from '../../form/presentational/Field';

import ModalOuterContainer from '../containers/ModalOuterContainer';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';
import ActionButton from '../../button/presentational/ActionButton';

const EditJobRefDropdownModal = ({
    company,
    isJobReferenceDropdownEnabled,
    handleChange,
    handleSubmit,
    closeModal,
}) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title={`Edit ${company.name}'s job reference dropdown access`} />

            <Form className="generic-form" onSubmit={handleSubmit}>
                <Field name="Should have access to job reference dropdowns?">
                    <CheckboxContainer
                        checked={isJobReferenceDropdownEnabled}
                        handleChange={() => handleChange(!isJobReferenceDropdownEnabled)}
                        name="isJobReferenceDropdownEnabled"
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

export default EditJobRefDropdownModal;
