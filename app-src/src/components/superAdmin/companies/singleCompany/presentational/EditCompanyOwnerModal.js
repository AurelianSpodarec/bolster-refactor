import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';

const EditCompanyOwnerModal = ({ handleChange, handleSubmit, hideModal, form }) => {
    return (
        <ModalOuterContainer>
            <Form onSubmit={handleSubmit}>
                <BlockButtonWrapper>
                    <button type="submit" className="button green">
                        <i className="fa fa-plus" />
                        Submit
                    </button>
                    <button type="button" className="button red" onClick={hideModal}>
                        <i className="fa fa-times" />
                        Cancel
                    </button>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default EditCompanyOwnerModal;
