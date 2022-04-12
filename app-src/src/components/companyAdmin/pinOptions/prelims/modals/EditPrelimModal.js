import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import useEditPrelim from '../hooks/useEditPrelim';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';

const EditPrelimModal = ({ set }) => {
    const { form, handleChange, isPosting, handleSubmit } = useEditPrelim(set);

    return (
        <ModalOuterContainer>
            <BlockHeading title={`Edit ${set.name}`} />

            <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
                <Field name="Name" required>
                    <TextInputContainer
                        name="name"
                        value={form.name}
                        handleChange={handleChange}
                        placeholder="Prelim name"
                        required
                    />
                </Field>

                <Field name="Type" required>
                    <DropdownContainer
                        placeholder="Choose prelim type"
                        name="type"
                        options={[{ value: 10, text: 'percent' }]}
                        value={form.type}
                        selectedOption={form.type}
                        handleChange={handleChange}
                        required
                    />
                </Field>

                <Field name="Value" required>
                    <TextInputContainer
                        name="value"
                        value={form.value}
                        handleChange={handleChange}
                        placeholder="Prelim value"
                        required
                    />
                </Field>

                <BlockButtonWrapper>
                    <ButtonWrapper alignment="right">
                        <ActionButton
                            text="Save"
                            icon={isPosting ? 'spinner' : 'save'}
                            iconSpin={isPosting}
                            ambient="positive"
                            size="medium"
                            disabled={isPosting}
                            type="submit"
                        />
                    </ButtonWrapper>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default EditPrelimModal;
