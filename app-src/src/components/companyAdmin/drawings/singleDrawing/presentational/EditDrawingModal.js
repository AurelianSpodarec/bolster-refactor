import React from 'react';
import fileDownload from 'js-file-download';
import { connect } from 'react-redux';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import { RAW_S3_STORAGE_URL } from 'config';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BolsterLabelExample from 'components/shared/generic/form/presentational/BolsterLabelExample';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import DatePickerPresentational from 'components/shared/generic/form/presentational/DatePicker';

const getFileName = src => src.match('[^/]*$')[0];
const EditDrawingModal = ({
    name,
    file,
    filesUploading,
    handleChange,
    handleDateChange,
    hideModal,
    handleSubmit,
    drawing: { doesRequireCreditToReplaceFloorplan, tilesetS3KeyOrig },
    isUsingBolsterLabels,
    isAlertShowing,
    message,
    dateToSend
}) => (
    <ModalOuterContainer
        extraClasses={`${isUsingBolsterLabels ? 'w-label-example' : ''}`}
    >
        <BlockHeading title="Edit drawing">
            <button
                className="button r-margin"
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
        {doesRequireCreditToReplaceFloorplan ? (
            <p className="generic-text size-lg-12">
                Note: updating the floorplan for this drawing will cost a
                credit.
            </p>
        ) : (
            <p className="generic-text size-lg-12">
                Note: This will not cost you a credit as this is a recently
                created drawing.
            </p>
        )}

        <Form className="generic-form" onSubmit={handleSubmit}>
            <div
                className={
                    isUsingBolsterLabels ? 'size-lg-6 size-md-12' : 'size-lg-12'
                }
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
                    <FileUploadContainer
                        name="file"
                        value={file}
                        handleChange={handleChange}
                        acceptedTypes={['application/pdf', 'image/*']}
                    />
                </Field>

                <div className="size-lg-12">
                    <div className="size-lg-6 size-md-12">
                        <Field name="Send an alert?">
                            <CheckboxContainer
                                checked={isAlertShowing}
                                name="isAlertShowing"
                                text=""
                                handleChange={handleChange}
                            />
                        </Field>
                    </div>
                </div>

                {isAlertShowing && (
                    <div className="size-lg-12">
                        <div
                            className={
                                isUsingBolsterLabels
                                    ? 'size-lg-12'
                                    : 'size-lg-6 size-md-12'
                            }
                        >
                            <Field name="Alert Message">
                                <TextAreaContainer
                                    value={message}
                                    name="message"
                                    handleChange={handleChange}
                                />
                            </Field>
                        </div>

                        <div
                            className={
                                isUsingBolsterLabels
                                    ? 'size-lg-12'
                                    : 'size-lg-6 size-md-12'
                            }
                        >
                            <Field name="Date to send">
                                <DatePickerPresentational
                                    name="dateToSend"
                                    selected={dateToSend}
                                    onChange={handleDateChange}
                                    placeholderText="Date"
                                    showTimeSelect
                                />
                            </Field>
                        </div>
                    </div>
                )}
            </div>
            {isUsingBolsterLabels && (
                <div className="size-lg-6 size-md-12">
                    <BolsterLabelExample name={name} />
                </div>
            )}

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
    </ModalOuterContainer>
);

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: {
            companySettings: { isUsingBolsterLabels }
        }
    }
}) => ({
    isUsingBolsterLabels
});

export default connect(mapStateToProps)(EditDrawingModal);
