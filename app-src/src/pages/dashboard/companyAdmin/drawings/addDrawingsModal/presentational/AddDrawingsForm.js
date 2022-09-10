import React from 'react';

import SubmitContainer from 'components_DEPRECATED/shared/generic/form/containers/SubmitContainer.js';
import Form from 'components_DEPRECATED/shared/generic/form/containers/Form';
import Field from 'components_DEPRECATED/shared/generic/form/presentational/Field';
import TextInputContainer from 'components_DEPRECATED/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components_DEPRECATED/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import FileUploadContainer from 'components_DEPRECATED/shared/generic/form/containers/FileUploadContainer';
import DatePickerPresentational from 'components_DEPRECATED/shared/generic/form/presentational/DatePicker';
import CheckboxContainer from 'components_DEPRECATED/shared/generic/form/containers/CheckboxContainer';
import CheckboxListContainer from 'components_DEPRECATED/shared/generic/form/containers/CheckboxListContainer';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import { ReactComponent as TrashIcon } from 'assets/images/icons/trash.svg';
import { ReactComponent as ArrowsRotate } from 'assets/images/icons/arrows-rotate.svg';
import FlexWrapper from 'components_DEPRECATED/shared/generic/flexWrapper/FlexWrapper';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';

// * .*. in names is used for splitting up field validations without risking overlap with real names

const AddDrawingsForm = ({
    handleSubmit,
    drawings,
    updateDrawing,
    addDrawing,
    removeDrawing,
    handleClose,
    isUsingBolsterLabels,
    credits,
    operativeOptions,
    clientOptions,
    updateSelectAll,
    isFetchingHierarchies,
}) => {
    const hasEnoughCredits = credits >= drawings.length;
    return (
        <Form onSubmit={handleSubmit} className="generic-form flex-content-wrapper size-lg-12">
            <div className="flex-content">
                <div className="form-fields-container size-lg-12">
                    <div className="size-lg-12">
                        {drawings.map(drawing => (
                            <div className="size-lg-12" key={drawing.id}>
                                <div
                                    className={
                                        isUsingBolsterLabels ? 'size-lg-6 size-md-12' : 'size-lg-12'
                                    }
                                >
                                    <div className="size-lg-12" key={drawing.id}>
                                        <Field name="Drawing name" required>
                                            <TextInputContainer
                                                name={`${drawing.id}.*.name`}
                                                value={drawing.name}
                                                handleChange={(name, value) =>
                                                    updateDrawing(name, value, drawing.id)
                                                }
                                                required
                                            />
                                        </Field>
                                    </div>
                                    <div className="size-lg-12">
                                        <Field name="Upload plan" required>
                                            <p className="generic-text no-margin">
                                                Please upload your drawing in .pdf, .jpg or .png
                                                format.
                                            </p>
                                            <br />
                                            <FileUploadContainer
                                                value={drawing.file}
                                                required
                                                name={`${drawing.id}.*.file`}
                                                acceptedTypes={[
                                                    'application/pdf',
                                                    'image/jpg',
                                                    'image/png',
                                                    'image/jpeg',
                                                ]}
                                                handleChange={(name, value) => {
                                                    updateDrawing(name, value, drawing.id);
                                                }}
                                            />
                                            <p className="generic-text size-lg-12">
                                                This can be changed free of charge for 24 hours
                                                after creation.
                                            </p>
                                        </Field>
                                    </div>
                                    <div className="size-lg-12">
                                        <div className="size-lg-6 size-md-12">
                                            <Field name="Set a start date?">
                                                <CheckboxContainer
                                                    checked={drawing.isStartDateShowing}
                                                    name={`${drawing.id}.*.isStartDateShowing`}
                                                    text=""
                                                    handleChange={(name, value) =>
                                                        updateDrawing(name, value, drawing.id)
                                                    }
                                                />
                                            </Field>
                                        </div>
                                    </div>

                                    {drawing.isStartDateShowing && (
                                        <div className="size-lg-12">
                                            <div className="size-lg-12">
                                                <Field name="Start Date">
                                                    <DatePickerPresentational
                                                        name={`${drawing.id}.*.startDate`}
                                                        selected={drawing.startDate}
                                                        onChange={value =>
                                                            updateDrawing(
                                                                `${drawing.id}.*.startDate`,
                                                                value,
                                                                drawing.id,
                                                            )
                                                        }
                                                        placeholderText="Date"
                                                    />
                                                </Field>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {!!clientOptions.length && (
                                    <div className="size-lg-12 check-col-6">
                                        <Field name="These clients have access to drawings on this level - invite them to this drawing?">
                                            <CheckboxListContainer
                                                options={clientOptions}
                                                name={`${drawing.id}.*.clientPermissionIDs`}
                                                selectedOptions={drawing.clientPermissionIDs}
                                                handleChange={(name, value) =>
                                                    updateDrawing(name, value, drawing.id)
                                                }
                                            />
                                        </Field>
                                    </div>
                                )}

                                {!!operativeOptions.length && (
                                    <div className="size-lg-12 check-col-6">
                                        <Field name="These operatives have access to drawings on this level - attach them to this drawing?">
                                            <span className="size-lg-12 select-all-check-all">
                                                <ButtonWrapper>
                                                    {drawing.operativePermissionIDs.length !==
                                                    operativeOptions.length ? (
                                                        <ActionButton
                                                            type="button"
                                                            text="Select All"
                                                            svgIconComponent={ArrowsRotate}
                                                            onClick={() => {
                                                                updateSelectAll(
                                                                    true,
                                                                    `${drawing.id}.*.operativePermissionIDs`,
                                                                    operativeOptions,
                                                                );
                                                            }}
                                                        />
                                                    ) : (
                                                        operativeOptions.length && (
                                                            <ActionButton
                                                                type="button"
                                                                ambient="positive"
                                                                source="secondary"
                                                                text="Deselect All"
                                                                svgIconComponent={ArrowsRotate}
                                                                onClick={() => {
                                                                    updateSelectAll(
                                                                        false,
                                                                        `${drawing.id}.*.operativePermissionIDs`,
                                                                    );
                                                                }}
                                                            />
                                                        )
                                                    )}
                                                </ButtonWrapper>
                                            </span>
                                            <CheckboxListContainer
                                                options={operativeOptions}
                                                name={`${drawing.id}.*.operativePermissionIDs`}
                                                selectedOptions={drawing.operativePermissionIDs}
                                                handleChange={(name, value) =>
                                                    updateDrawing(name, value, drawing.id)
                                                }
                                                classes="select-all-list-container"
                                            />
                                        </Field>
                                    </div>
                                )}

                                {drawings.length > 1 && (
                                    <BlockButtonWrapper>
                                        <ActionButton
                                            type="button"
                                            svgIconComponent={TrashIcon}
                                            onClick={() => removeDrawing(drawing.id)}
                                            ambient="positive"
                                            source="secondary"
                                            iconOnly
                                        />
                                    </BlockButtonWrapper>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <FlexWrapper justify="between" extraClasses="flex-modal-footer">
                <ActionButton
                    type="button"
                    text="Add another drawing"
                    icon="plus"
                    onClick={addDrawing}
                    ambient="positive"
                    extraClasses="margin-left"
                />

                <ButtonWrapper>
                    <ActionButton source="secondary" text="Cancel" onClick={handleClose} />
                    {hasEnoughCredits ? (
                        <>
                            {isFetchingHierarchies ? (
                                <ActionButton
                                    text="Please wait..."
                                    icon="fa fa-spinner fa-spin"
                                    disabled="true"
                                />
                            ) : (
                                <SubmitContainer text="Confirm" />
                            )}
                        </>
                    ) : (
                        <ActionButton
                            icon="fa fa-times"
                            text="Not enough credits"
                            ambient="negative"
                            type="button"
                            disabled
                        />
                    )}
                </ButtonWrapper>
            </FlexWrapper>
        </Form>
    );
};
export default AddDrawingsForm;
