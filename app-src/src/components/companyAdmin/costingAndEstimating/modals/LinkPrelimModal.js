import React from 'react';

import useLinkPrelim from '../_hooks/useLinkPrelim';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ModalHeading from 'components/shared/generic/modals/presentational/ModalHeading';
import Field from 'components/shared/generic/form/presentational/Field';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';

const LinkPrelimModal = () => {
    const { form, handleChange, handleSubmit, isPosting, prelimsOptions, closeModal } =
        useLinkPrelim();

    return (
        <ModalOuterContainer hideCloseButton>
            <ModalHeading title={'Add prelim'} />

            <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
                <Field name="" required>
                    <DropdownContainer
                        name="prelimID"
                        options={Object.values(prelimsOptions)}
                        value={prelimsOptions[form.prelimID]}
                        selectedOption={prelimsOptions[form.prelimID]}
                        handleChange={handleChange}
                        required
                    />
                </Field>
                <BlockButtonWrapper>
                    <ButtonWrapper alignment="right">
                        <ActionButton
                            text="Cancel"
                            onClick={closeModal}
                            source="secondary"
                            size="small"
                        />
                        <ActionButton
                            text="Save"
                            icon={isPosting ? 'spinner' : 'save'}
                            iconSpin={isPosting}
                            size="small"
                            disabled={isPosting}
                            type="submit"
                        />
                    </ButtonWrapper>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default LinkPrelimModal;
