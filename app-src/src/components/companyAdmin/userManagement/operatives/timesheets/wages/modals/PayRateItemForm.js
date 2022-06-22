import React from 'react';

import { dayOptions } from '../../../../../../../constants/companyAdmin/options';

import Field from '../../../../../../shared/generic/form/presentational/Field';
import TextInputContainer from '../../../../../../shared/generic/form/containers/TextInputContainer';
import TimePickerContainer from '../../../../../../shared/generic/form/containers/TimePickerContainer';
import PickListContainer from '../../../../../../shared/generic/form/containers/PickListContainer';
import ActionButton from '../../../../../../shared/generic/button/presentational/ActionButton';
import NumberInputContainer from '../../../../../../shared/generic/form/containers/NumberInputContainer';

const PayRateItemForm = ({
    isExpanded,
    items,
    handleItemsChange,
    companyPayRateID,
    handleAddNewItem,
    handleDeleteItem,
    payRate,
    handleChange,
}) => {
    return (
        <div className={`pay-rate-form ${isExpanded ? 'expanded' : ''}`}>
            <div className="flex-row">
                <Field name="Name">
                    <TextInputContainer name="baseRate" value="Base Rate" disabled />
                </Field>
                <Field name="Hourly Rate">
                    <NumberInputContainer
                        name="baseRate"
                        handleChange={(_, value) =>
                            handleChange(companyPayRateID, { ...payRate, baseRate: value })
                        }
                        value={payRate.baseRate}
                        placeholder="-"
                    />
                </Field>
            </div>
            {items.map(item => {
                const { id, guid, name, rate, startTime, endTime, days } = item;
                const idToUse = guid || id;
                return (
                    <div key={idToUse} className="flex-row">
                        <Field name="Name">
                            <TextInputContainer
                                name="name"
                                handleChange={(_, value) =>
                                    handleItemsChange(companyPayRateID, { ...item, name: value })
                                }
                                value={name}
                                placeholder="-"
                            />
                        </Field>
                        <Field name="Hourly Rate">
                            <NumberInputContainer
                                name="rate"
                                handleChange={(_, value) =>
                                    handleItemsChange(companyPayRateID, { ...item, rate: value })
                                }
                                value={rate}
                                placeholder="-"
                            />
                        </Field>
                        <Field name="Start">
                            <TimePickerContainer
                                name="startTime"
                                handleChange={(_, value) =>
                                    handleItemsChange(companyPayRateID, {
                                        ...item,
                                        startTime: value,
                                    })
                                }
                                value={startTime}
                                clearIcon={null}
                                extraClasses="padded"
                            />
                        </Field>
                        <Field name="End">
                            <TimePickerContainer
                                name="endTime"
                                handleChange={(_, value) =>
                                    handleItemsChange(companyPayRateID, { ...item, endTime: value })
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
                                    handleItemsChange(companyPayRateID, { ...item, days: value })
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
