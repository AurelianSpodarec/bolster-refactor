import React from 'react';

import { dayOptions } from '../../../../../../../constants/companyAdmin/options';

import Field from '../../../../../../shared/generic/form/presentational/Field';
import TextInputContainer from '../../../../../../shared/generic/form/containers/TextInputContainer';
import TimePickerContainer from '../../../../../../shared/generic/form/containers/TimePickerContainer';
import PickListContainer from '../../../../../../shared/generic/form/containers/PickListContainer';
import ActionButton from '../../../../../../shared/generic/button/presentational/ActionButton';

const PayRateItemForm = ({
    isExpanded,
    items,
    handleChange,
    companyPayRateID,
    handleAddNewItem,
    handleDeleteItem,
}) => {
    return (
        <div className={`pay-rate-form ${isExpanded ? 'expanded' : ''}`}>
            {items.map(item => {
                const { id, guid, name, rate, startTime, endTime, days } = item;
                const idToUse = guid || id;
                return (
                    <div key={id} className="flex-row">
                        <Field name="Name">
                            <TextInputContainer
                                name="name"
                                handleChange={(_, value) =>
                                    handleChange(companyPayRateID, { ...item, name: value })
                                }
                                value={name}
                                placeholder="-"
                            />
                        </Field>
                        <Field name="Hourly Rate">
                            <TextInputContainer
                                name="rate"
                                handleChange={(_, value) =>
                                    handleChange(companyPayRateID, { ...item, rate: value })
                                }
                                value={rate}
                                placeholder="-"
                            />
                        </Field>
                        <Field name="Start" sizeClasses="size-lg-10">
                            <TimePickerContainer
                                name="startTime"
                                handleChange={(_, value) =>
                                    handleChange(companyPayRateID, { ...item, startTime: value })
                                }
                                value={startTime}
                                clearIcon={null}
                                extraClasses="padded"
                            />
                        </Field>
                        <Field name="End" sizeClasses="size-lg-10">
                            <TimePickerContainer
                                name="endTime"
                                handleChange={(_, value) =>
                                    handleChange(companyPayRateID, { ...item, endTime: value })
                                }
                                value={endTime}
                                clearIcon={null}
                                extraClasses="padded"
                            />
                        </Field>

                        <Field name="Range">
                            <PickListContainer
                                name="days"
                                value={days}
                                handleChange={(_, value) =>
                                    handleChange(companyPayRateID, { ...item, days: value })
                                }
                                options={dayOptions}
                                required
                            />
                        </Field>

                        <button
                            className="flex flex-column justify-center delete-icon"
                            onClick={() => handleDeleteItem(companyPayRateID, idToUse)}
                            disabled={items.length === 1}
                        >
                            <i className="far fa-trash-alt" />
                        </button>
                    </div>
                );
            })}

            <div className="field-padding">
                <ActionButton
                    text="Add"
                    icon="plus"
                    onClick={() => handleAddNewItem(companyPayRateID)}
                />
            </div>
        </div>
    );
};

export default PayRateItemForm;
