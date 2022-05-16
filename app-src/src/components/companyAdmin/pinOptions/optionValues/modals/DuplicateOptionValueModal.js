import React from 'react';

import useDuplicateOptionValue from '../hooks/useDuplicateOptionValue';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ModalHeading from 'components/shared/generic/modals/presentational/ModalHeading';

const DuplicateOptionValueModal = ({ option, hideModal }) => {
    const { form, handleChange, handleSubmit, isPosting } = useDuplicateOptionValue(option);

    return (
        <ModalOuterContainer hideCloseButton>
            <ModalHeading title={`Duplicate ${option.name}?`} />

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

                <Field name="Short Name" labelClasses="small-margin">
                    <p className="generic-text size-lg-12">
                        This is how the pin option will output through the app.
                    </p>

                    <TextInputContainer
                        name="shortName"
                        value={form.shortName}
                        handleChange={handleChange}
                        placeholder="Type short name"
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

export default DuplicateOptionValueModal;
