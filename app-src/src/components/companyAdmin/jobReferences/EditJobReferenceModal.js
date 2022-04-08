import React from 'react';

import useEditJobReference from './hooks/useEditJobReference';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import ButtonWrapper from '../../shared/generic/button/presentational/ButtonWrapper';
import ActionButton from '../../shared/generic/button/presentational/ActionButton';

const EditJobReferenceModal = ({ hideModal, jobReference }) => {
    const { isPosting, form, handleChange, handleSubmit } = useEditJobReference(jobReference);

    return (
        <ModalOuterContainer>
            <BlockHeading title="Edit Job Reference" />

            <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
                <Field name="Name" required>
                    <TextInputContainer
                        name="name"
                        value={form.name}
                        handleChange={handleChange}
                        required
                    />
                </Field>

                <Field name="Description" required>
                    <TextAreaContainer
                        name="description"
                        value={form.description}
                        handleChange={handleChange}
                        required
                    />
                </Field>

                <div className="size-lg-12">
                    <ButtonWrapper alignment="right">
                        <ActionButton
                            text="Cancel"
                            onClick={hideModal}
                            source="secondary"
                            size="small"
                        />
                        <ActionButton
                            text="Confirm"
                            type="submit"
                            icon="check"
                            size="small"
                            disabled={isPosting}
                        />
                    </ButtonWrapper>
                </div>
            </Form>
        </ModalOuterContainer>
    );
};

export default EditJobReferenceModal;
