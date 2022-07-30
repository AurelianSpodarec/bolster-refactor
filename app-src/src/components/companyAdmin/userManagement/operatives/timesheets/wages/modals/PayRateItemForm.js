import React from 'react';

import { dayOptions, timeOptions } from 'constants/companyAdmin/options';

import Field from '../../../../../../shared/generic/form/presentational/Field';
import TextInputContainer from '../../../../../../shared/generic/form/containers/TextInputContainer';
import PickListContainer from '../../../../../../shared/generic/form/containers/PickListContainer';
import ActionButton from '../../../../../../shared/generic/button/presentational/ActionButton';
import NumberInputContainer from '../../../../../../shared/generic/form/containers/NumberInputContainer';
import Select from '../../../../../../shared/generic/form/presentational/Select';

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
                        <Field name="Hourly Rate" classes="flex-7">
                            <NumberInputContainer
                                name="rate"
                                handleChange={(_, value) =>
                                    handleItemsChange(companyPayRateID, { ...item, rate: value })
                                }
                                value={rate}
                                placeholder="-"
                            />
                        </Field>
                        <Field name="Start" classes="flex-10">
                            <Select
                                name="startTime"
                                value={startTime}
                                onChange={(_, value) =>
                                    handleItemsChange(companyPayRateID, {
                                        ...item,
                                        startTime: value,
                                    })
                                }
                                options={timeOptions}
                                classes="large"
                                placeholder="select"
                            />
                        </Field>
                        <Field name="End" classes="flex-10">
                            <Select
                                name="endTime"
                                value={endTime}
                                onChange={(_, value) =>
                                    handleItemsChange(companyPayRateID, { ...item, endTime: value })
                                }
                                options={timeOptions}
                                classes="large"
                                placeholder="select"
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
