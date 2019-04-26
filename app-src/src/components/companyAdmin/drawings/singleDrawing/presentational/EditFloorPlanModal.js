import React from 'react';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const EditFloorPlanModal = ({
    floorPlan,
    handleChange,
    hideModal,
    handleSubmit
}) => (
    <ModalOuterContainer>
        <BlockHeading title="Upload a new floor plan." />
        <p className="generic-text intro-text size-lg-12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
        </p>

        <Form className="generic-form" onSubmit={handleSubmit}>
            <Field name="Upload file">
                <FileUploadContainer
                    name="floorPlan"
                    value={floorPlan}
                    handleChange={handleChange}
                />
            </Field>
            <BlockButtonWrapper>
                <button className="button green" type="submit">
                    Update
                </button>
                <ButtonContainer onClick={hideModal}>Cancel</ButtonContainer>
            </BlockButtonWrapper>
        </Form>
    </ModalOuterContainer>
);

export default EditFloorPlanModal;
