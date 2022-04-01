import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';
import ActionButton from '../../button/presentational/ActionButton';

const EditServiceModal = ({ name, handleChange, handleSubmit, hideModal }) => (
    <ModalOuterContainer>
        <BlockHeading title="Edit Service" />

        <Form className="generic-form" onSubmit={handleSubmit}>
            <div className="size-lg-6 size-md-12">
                <Field name="Service name" required>
                    <TextInputContainer
                        handleChange={handleChange}
                        name="name"
                        value={name}
                        required
                    />
                </Field>
            </div>

            <div className="size-lg-12">
                <ButtonWrapper alignment="right">
                    <ActionButton
                        text="Cancel"
                        onClick={hideModal}
                        source="secondary"
                        size="small"
                    />
                    <ActionButton text="Confirm" type="submit" icon="check" size="small" />
                </ButtonWrapper>
            </div>
        </Form>
    </ModalOuterContainer>
);

export default EditServiceModal;
