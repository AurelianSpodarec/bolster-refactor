import React from 'react';
import fileDownload from 'js-file-download';
import { connect } from 'react-redux';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import { RAW_S3_STORAGE_URL } from 'config';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import DatePickerPresentational from 'components/shared/generic/form/presentational/DatePicker';
import { FLOORPLAN_STATES } from 'constants/companyAdmin/enums';
import ActionButton from '../../../../../../components/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from '../../../../../../components/shared/generic/button/presentational/ButtonWrapper';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';

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
        <FlexModalOuter
            title="Edit drawing"
            extraClasses={`${isUsingBolsterLabels ? 'w-label-example' : ''}`}
            headingChildren={
                latestFloorplanState === FLOORPLAN_STATES.COMPLETE && (
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
                )
            }
        >
            <Form className="generic-form flex-content-wrapper" onSubmit={handleSubmit}>
                <div className="flex-content">
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

                    <div className="form-fields-container">
                        <div
                            className={isUsingBolsterLabels ? 'size-lg-6 size-md-12' : 'size-lg-12'}
                        >
                            <Field name="Drawing name" required>
                                <TextInputContainer
                                    name="name"
                                    value={name}
                                    handleChange={handleChange}
                                    required
                                />
                            </Field>
                            <Field name="Change floorplan">
                                <p>Please upload your drawing in .pdf, .jpg or .png format.</p>{' '}
                                <br />
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
                    </div>
                </div>

                <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                    <ActionButton
                        text="Cancel"
                        onClick={hideModal}
                        source="secondary"
                        size="small"
                    />
                    <ActionButton
                        text={filesUploading ? 'Please wait...' : 'Confirm'}
                        icon={filesUploading ? 'spinner' : 'check'}
                        iconSpin={filesUploading}
                        type="submit"
                        size="small"
                    />
                </ButtonWrapper>
            </Form>
        </FlexModalOuter>
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
