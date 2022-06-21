import React from 'react';

import { dayOptions } from '../../../../../../../constants/companyAdmin/options';

import Field from '../../../../../../shared/generic/form/presentational/Field';
import TextInputContainer from '../../../../../../shared/generic/form/containers/TextInputContainer';
import TimePickerContainer from '../../../../../../shared/generic/form/containers/TimePickerContainer';
import PickListContainer from '../../../../../../shared/generic/form/containers/PickListContainer';
import ActionButton from '../../../../../../shared/generic/button/presentational/ActionButton';

const PayRateItemForm = ({ isExpanded, items, handleChange, handleAddNewItem }) => {
    return (
        <div className={`pay-rate-form ${isExpanded ? 'expanded' : ''}`}>
            {items.map(item => {
                const { id, name, rate, startTime, endTime, days } = item;

                return (
                    <div key={id} className="flex-row">
                        <Field name="Name">
                            <TextInputContainer
                                name="name"
                                handleChange={(_, value) =>
                                    handleChange(id, { ...item, name: value })
                                }
                                value={name}
                                placeholder="-"
                            />
                        </Field>
                        <Field name="Hourly Rate">
                            <TextInputContainer
                                name="rate"
                                handleChange={(_, value) =>
                                    handleChange(id, { ...item, rate: value })
                                }
                                value={rate}
                                placeholder="-"
                            />
                        </Field>
                        <Field name="Start" sizeClasses="size-lg-10">
                            <TimePickerContainer
                                name="startTime"
                                handleChange={(_, value) =>
                                    handleChange(id, { ...item, startTime: value })
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
                                    handleChange(id, { ...item, endTime: value })
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
                                    handleChange(id, { ...item, days: value })
                                }
                                options={dayOptions}
                                required
                            />
                        </Field>
                    </div>
                );
            })}
            <div className="field-padding">
                <ActionButton text="Add" icon="plus" onClick={handleAddNewItem} />
            </div>
        </div>
    );
};

export default PayRateItemForm;
