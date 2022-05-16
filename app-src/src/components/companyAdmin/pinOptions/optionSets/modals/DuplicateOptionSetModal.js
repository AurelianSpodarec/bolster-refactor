import React from 'react';

import useDuplicateOptionSet from '../hooks/useDuplicateOptionSet';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ModalHeading from 'components/shared/generic/modals/presentational/ModalHeading';

const DuplicateOptionSetModal = ({ set, hideModal }) => {
    const { form, handleChange, handleSubmit, isPosting } = useDuplicateOptionSet(set);

    return (
        <ModalOuterContainer hideCloseButton>
            <ModalHeading title={`Duplicate ${set.name}?`} />

            <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
                <Field name="Name" required>
                    <TextInputContainer
                        name="name"
                        value={form.name}
                        handleChange={handleChange}
                        placeholder="Type name"
                        required
                    />
                </Field>

                <BlockButtonWrapper>
                    <ButtonWrapper alignment="right">
                        <ActionButton text="Cancel" source="secondary" onClick={hideModal} />
                        <ActionButton
                            text="Duplicate"
                            icon={isPosting ? 'spinner' : 'copy'}
                            iconSpin={isPosting}
                            disabled={isPosting}
                            type="submit"
                        />
                    </ButtonWrapper>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default DuplicateOptionSetModal;
