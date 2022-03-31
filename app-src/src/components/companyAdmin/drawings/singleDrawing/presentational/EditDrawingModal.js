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
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import DatePickerPresentational from 'components/shared/generic/form/presentational/DatePicker';
import { FLOORPLAN_STATES, DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import ActionButton from '../../../../shared/generic/button/presentational/ActionButton';
import ButtonWrapper from '../../../../shared/generic/button/presentational/ButtonWrapper';

const getFileName = src => src.match('[^/]*$')[0];
const EditDrawingModal = ({
    name,
    file,
    filesUploading,
    handleChange,
    handleDateChange,
    handleStartDateChange,
    hideModal,
    handleSubmit,
    drawing: { doesRequireCreditToReplaceFloorplan, tilesetS3KeyOrig, latestFloorplanState },
    isUsingBolsterLabels,
    isAlertShowing,
    message,
    dateToSend,
    startDate,
    isManufacturingInherited,
    setManufacturersForHierarchy,
    manufacturerOptions,
    selectedManufacturerOptions,
    selectedOptionValues,
    optionValuesOptions,
    handleShowManufacturingOptions,
    showManufacturingOptions,
    manufacturingInheritedFrom,
    showDropdownOptions,
    setDropdownOptionsForHierarchy,
    isDropdownOptionsInherited,
    selectedDropdownOptions,
    dropdownOptions,
    isDropDownOptionsInheritedFrom,
    handleShowDropdownOptions,
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
                {showManufacturingOptions ? (
                    <>
                        <div className="size-lg-12">
                            <div className="size-lg-6 size-md-12">
                                <Field
                                    labelClasses="no-capitalise"
                                    name="Set manufacturer(s) for drawing?"
                                >
                                    <CheckboxContainer
                                        checked={setManufacturersForHierarchy}
                                        name="setManufacturersForHierarchy"
                                        text=""
                                        handleChange={handleChange}
                                        disabled={isManufacturingInherited}
                                    />
                                </Field>
                            </div>
                        </div>
                        {setManufacturersForHierarchy && (
                            <div className="size-lg-12">
                                <Field labelClasses="no-capitalise" name="Manufacturer(s)" required>
                                    <CheckboxListContainer
                                        name="selectedManufacturerOptions"
                                        text=""
                                        handleChange={handleChange}
                                        selectedOptions={selectedManufacturerOptions}
                                        options={manufacturerOptions}
                                        allOptionsDisabled={isManufacturingInherited}
                                        required
                                    />
                                </Field>
                            </div>
                        )}

                        {setManufacturersForHierarchy &&
                            manufacturerOptions
                                .filter(man => selectedManufacturerOptions.includes(`${man.id}`))
                                .map(man => {
                                    return (
                                        <div className="size-lg-12" key={man.id}>
                                            <Field
                                                labelClasses="no-capitalise"
                                                name={`${man.name} ${
                                                    DROPDOWN_OPTIONS[man.pinOptionType].name
                                                }
                              `}
                                            >
                                                <CheckboxListContainer
                                                    name="selectedOptionValues"
                                                    text=""
                                                    handleChange={handleChange}
                                                    selectedOptions={selectedOptionValues}
                                                    options={optionValuesOptions[man.id] || []}
                                                    allOptionsDisabled={isManufacturingInherited}
                                                />
                                            </Field>
                                        </div>
                                    );
                                })}
                    </>
                ) : (
                    <>
                        <FieldOutput fieldClass="center-align">
                            <div className="form-field size-lg-12">
                                <p>
                                    Manufacturers already set at {manufacturingInheritedFrom}.
                                    <br /> This cannot be overridden at this level, click{' '}
                                    <span onClick={() => handleShowManufacturingOptions()}>
                                        here
                                    </span>{' '}
                                    to see the settings.
                                </p>
                            </div>
                        </FieldOutput>
                    </>
                )}{' '}
                {showDropdownOptions ? (
                    <>
                        <div className="size-lg-12">
                            <div className="size-lg-6 size-md-12">
                                <Field
                                    labelClasses="no-capitalise"
                                    name="Set item types for drawing?"
                                >
                                    <CheckboxContainer
                                        checked={setDropdownOptionsForHierarchy}
                                        name="setDropdownOptionsForHierarchy"
                                        text=""
                                        handleChange={handleChange}
                                        disabled={isDropdownOptionsInherited}
                                    />
                                </Field>
                            </div>
                        </div>
                        {setDropdownOptionsForHierarchy && (
                            <div className="size-lg-12">
                                <Field labelClasses="no-capitalise" name="Item type(s)">
                                    <CheckboxListContainer
                                        name="selectedDropdownOptions"
                                        text=""
                                        handleChange={handleChange}
                                        selectedOptions={selectedDropdownOptions}
                                        options={dropdownOptions}
                                        allOptionsDisabled={isDropdownOptionsInherited}
                                    />
                                </Field>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <FieldOutput fieldClass="center-align">
                            <div className="form-field size-lg-12">
                                <p>
                                    Item types already set at {isDropDownOptionsInheritedFrom}.
                                    <br /> This cannot be overridden at this level, click{' '}
                                    <span
                                        onClick={() => {
                                            handleShowDropdownOptions();
                                        }}
                                    >
                                        here
                                    </span>{' '}
                                    to see the settings.
                                </p>
                            </div>
                        </FieldOutput>
                    </>
                )}
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
