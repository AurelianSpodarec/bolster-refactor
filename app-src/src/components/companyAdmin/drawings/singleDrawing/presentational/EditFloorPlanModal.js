import React from 'react';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const EditFloorPlanModal = ({
    file,
    handleChange,
    hideModal,
    handleSubmit
}) => (
    <ModalOuterContainer>
        <BlockHeading title="Upload a new floor plan." />
        <Form className="generic-form" onSubmit={handleSubmit}>
            <Field name="Upload file">
                <FileUploadContainer
                    name="file"
                    value={file}
                    handleChange={handleChange}
                    required
                />
            </Field>
            <BlockButtonWrapper>
                <button className="button green" type="submit">
                    Update
                </button>
                <ButtonContainer handleClick={hideModal}>
                    Cancel
                </ButtonContainer>
            </BlockButtonWrapper>
        </Form>
    </ModalOuterContainer>
);

export default EditFloorPlanModal;
