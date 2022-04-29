import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ModalHeading from 'components/shared/generic/modals/presentational/ModalHeading';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import useAddExistingPrelim from '../_hooks/useAddExistingPrelim';

const AddCostingAndEstimatingPrelimModal = () => {
    const { form, handleChange, handleSubmit, isPosting } = useAddExistingPrelim();

    return (
        <ModalOuterContainer hideCloseButton>
            <ModalHeading title={'Add prelim'} />

            <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
                <BlockButtonWrapper>
                    <ButtonWrapper alignment="right">
                        <ActionButton
                            text="Cancel"
                            onClick={hideModal}
                            source="secondary"
                            size="small"
                        />
                        <ActionButton
                            text="Confirm"
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

export default AddCostingAndEstimatingPrelimModal;
