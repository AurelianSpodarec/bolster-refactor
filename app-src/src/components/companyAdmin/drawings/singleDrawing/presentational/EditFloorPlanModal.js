import React from 'react';
import fileDownload from 'js-file-download';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import { RAW_S3_STORAGE_URL } from 'config';
import Block from 'components/shared/generic/block/presentational/Block';

const getFileName = src => src.match('[^/]*$')[0];
const EditFloorPlanModal = ({
    file,
    filesUploading,
    handleChange,
    hideModal,
    handleSubmit,
    drawing: { doesRequireCreditToReplaceFloorplan, tilesetS3KeyOrig }
}) => (
    <ModalOuterContainer>
        <Block>
            <BlockHeading title="Upload a new floor plan.">
                <button
                    className="button"
                    onClick={() =>
                        fetch(`${RAW_S3_STORAGE_URL}/${tilesetS3KeyOrig}`).then(
                            res => {
                                res.blob().then(blob =>
                                    fileDownload(
                                        blob,
                                        getFileName(tilesetS3KeyOrig)
                                    )
                                );
                            }
                        )
                    }
                >
                    <i className="fa fa-download" /> Download current floorplan
                </button>
            </BlockHeading>
            {doesRequireCreditToReplaceFloorplan && (
                <p className="generic-text size-lg-12">
                    Note: updating the floorplan for this drawing will cost a
                    credit.
                </p>
            )}

            <Form className="generic-form" onSubmit={handleSubmit}>
                <Field name="Upload file" required>
                    <FileUploadContainer
                        name="file"
                        value={file}
                        handleChange={handleChange}
                        acceptedTypes={['application/pdf', 'image/*']}
                        required
                    />
                </Field>
                <BlockButtonWrapper>
                    <button className="button green" type="submit">
                        {filesUploading ? (
                            'Please wait...'
                        ) : (
                            <>
                                <i className="fa fa-plus" />
                                Update
                            </>
                        )}
                    </button>
                    <ButtonContainer handleClick={hideModal}>
                        Cancel
                    </ButtonContainer>
                </BlockButtonWrapper>
            </Form>
        </Block>
    </ModalOuterContainer>
);

export default EditFloorPlanModal;
