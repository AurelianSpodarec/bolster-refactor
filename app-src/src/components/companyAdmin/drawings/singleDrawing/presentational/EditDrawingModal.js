import React from 'react';
import fileDownload from 'js-file-download';
import { connect } from 'react-redux';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import { RAW_S3_STORAGE_URL } from 'config';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import DatePickerPresentational from 'components/shared/generic/form/presentational/DatePicker';
import { FLOORPLAN_STATES } from 'constants/companyAdmin/enums';
import ActionButton from '../../../../shared/generic/button/presentational/ActionButton';
import ButtonWrapper from '../../../../shared/generic/button/presentational/ButtonWrapper';

const getFileName = src => src.match('[^/]*$')[0];
const EditDrawingModal = ({
    name,
    file,
    filesUploading,
    handleChange,
    handleStartDateChange,
    hideModal,
    handleSubmit,
    drawing: { doesRequireCreditToReplaceFloorplan, tilesetS3KeyOrig, latestFloorplanState },
    isUsingBolsterLabels,
    startDate,
    drawingNotStarted,
}) => {
    return (
        <ModalOuterContainer extraClasses={`${isUsingBolsterLabels ? 'w-label-example' : ''}`}>
            <BlockHeading title="Edit drawing">
                {latestFloorplanState === FLOORPLAN_STATES.COMPLETE && (
                    <ActionButton
                        text="Download current floorplan"
                        onClick={() =>
                            fetch(`${RAW_S3_STORAGE_URL}/${tilesetS3KeyOrig}`).then(res => {
                                res.blob().then(blob =>
                                    fileDownload(blob, getFileName(tilesetS3KeyOrig)),
                                );
                            })
                        }
                        size="small"
                        icon="download"
                        source="secondary"
                        ambient="positive"
                    />
                )}
            </BlockHeading>
            {doesRequireCreditToReplaceFloorplan ? (
                <p className="generic-text size-lg-12">
                    Note: updating the floorplan for this drawing will cost a credit.
                </p>
            ) : (
                <p className="generic-text size-lg-12">
                    Note: This will not cost you a credit as this is a{' '}
                    {latestFloorplanState === FLOORPLAN_STATES.FAILEDCANCELLED
                        ? 'failed upload'
                        : 'recently created drawing'}
                    .
                </p>
            )}

            <Form className="generic-form" onSubmit={handleSubmit}>
                <div className={isUsingBolsterLabels ? 'size-lg-6 size-md-12' : 'size-lg-12'}>
                    <Field name="Drawing name" required>
                        <TextInputContainer
                            name="name"
                            value={name}
                            handleChange={handleChange}
                            required
                        />
                    </Field>
                    <Field name="Change floorplan">
                        <p>Please upload your drawing in .pdf, .jpg or .png format.</p> <br />
                        <FileUploadContainer
                            name="file"
                            value={file}
                            handleChange={handleChange}
                            acceptedTypes={[
                                'application/pdf',
                                'image/jpg',
                                'image/jpeg',
                                'image/png',
                            ]}
                        />
                    </Field>
                    {drawingNotStarted && (
                        <Field name="Start Date">
                            <DatePickerPresentational
                                name="startDate"
                                selected={startDate}
                                onChange={handleStartDateChange}
                                placeholderText="Date"
                            />
                        </Field>
                    )}
                </div>

                <div className="size-lg-12">
                    <ButtonWrapper alignment="right">
                        <ActionButton
                            text="Cancel"
                            onClick={hideModal}
                            source="secondary"
                            size="small"
                        />
                        <ActionButton
                            text={filesUploading ? 'Please wait...' : 'Update'}
                            type="submit"
                            icon="check"
                            size="small"
                        />
                    </ButtonWrapper>
                </div>
            </Form>
        </ModalOuterContainer>
    );
};

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: {
            companySettings: { isUsingBolsterLabels },
        },
    },
}) => ({
    isUsingBolsterLabels,
});

export default connect(mapStateToProps)(EditDrawingModal);
