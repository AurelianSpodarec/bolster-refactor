import React from 'react';

import Field from 'components_DEPRECATED/shared/generic/form/presentational/Field';
import TextInputContainer from 'components_DEPRECATED/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components_DEPRECATED/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import TextAreaContainer from 'components_DEPRECATED/shared/generic/form/containers/TextAreaContainer';
import DatePickerPresentational from 'components_DEPRECATED/shared/generic/form/presentational/DatePicker';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import { ReactComponent as TrashIcon } from 'assets/images/icons/trash.svg';

// * .*. in names is used for splitting up field validations without risking overlap with real names

const BuildingFormFieldsWithLabel = ({ buildings, updateBuilding, removeBuilding }) =>
    buildings.map(building => {
        return (
            <div key={building.id} className="size-lg-12">
                <div className="size-lg-6 size-md-12">
                    <div className="size-lg-12">
                        <Field name="Building name" required>
                            <TextInputContainer
                                name={`${building.id}.*.name`}
                                value={building.name}
                                handleChange={(name, value) =>
                                    updateBuilding(name, value, building.id)
                                }
                                required
                            />
                        </Field>
                    </div>
                    <div className="size-lg-12">
                        <Field name="Location">
                            <TextInputContainer
                                value={building.location}
                                name={`${building.id}.*.location`}
                                handleChange={(name, value) =>
                                    updateBuilding(name, value, building.id)
                                }
                            />
                        </Field>
                    </div>

                    {building.isAlertShowing && (
                        <div className="size-lg-12">
                            <div className="size-lg-12">
                                <Field name="Alert Message">
                                    <TextAreaContainer
                                        value={building.message}
                                        name={`${building.id}.*.message`}
                                        handleChange={(name, value) =>
                                            updateBuilding(name, value, building.id)
                                        }
                                    />
                                </Field>
                            </div>

                            <div className="size-lg-12">
                                <Field name="Date to send">
                                    <DatePickerPresentational
                                        name={`${building.id}.*.dateToSend`}
                                        selected={building.dateToSend}
                                        onChange={value =>
                                            updateBuilding(
                                                `${building.id}.*.dateToSend`,
                                                value,
                                                building.id,
                                            )
                                        }
                                        placeholderText="Date"
                                        showTimeSelect
                                    />
                                </Field>
                            </div>
                        </div>
                    )}
                </div>

                {buildings.length > 1 && (
                    <BlockButtonWrapper>
                        <ActionButton
                            type="button"
                            svgIconComponent={TrashIcon}
                            onClick={() => removeBuilding(building.id)}
                            ambient="positive"
                            source="secondary"
                            iconOnly
                        />
                    </BlockButtonWrapper>
                )}
            </div>
        );
    });

export default BuildingFormFieldsWithLabel;
