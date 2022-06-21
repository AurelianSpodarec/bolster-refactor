import React from 'react';

import { useForm } from '../../../../../../../helpers/hooks';

import { convertArrToObj, getValuesFromBitMaskArray } from '../../../../../../../helpers/generic';

import { dayOptions } from '../../../../../../../constants/companyAdmin/options';

import Field from '../../../../../../shared/generic/form/presentational/Field';
import TextInputContainer from '../../../../../../shared/generic/form/containers/TextInputContainer';
import TimePickerContainer from '../../../../../../shared/generic/form/containers/TimePickerContainer';
import PickListContainer from '../../../../../../shared/generic/form/containers/PickListContainer';

const PayRateItemForm = ({ isExpanded, items }) => {
    const [itemsForm, handleChange] = useForm(convertArrToObj(items));

    return (
        <div className={`pay-rate-form ${isExpanded ? 'expanded' : ''}`}>
            {Object.values(itemsForm).map(item => {
                const { id, name, rate, startTime, endTime, days } = item;
                const formattedDays = getValuesFromBitMaskArray(days);

                return (
                    <div key={id} className="flex-row">
                        <Field name="Name">
                            <TextInputContainer
                                name="name"
                                handleChange={(_, value) =>
                                    handleChange(id, { ...item, name: value })
                                }
                                value={name}
                            />
                        </Field>
                        <Field name="Hourly Rate">
                            <TextInputContainer
                                name="rate"
                                handleChange={(_, value) =>
                                    handleChange(id, { ...item, rate: value })
                                }
                                value={rate}
                            />
                        </Field>
                        <Field name="Start" sizeClasses="size-lg-8">
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
                        <Field name="End" sizeClasses="size-lg-8">
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
                                name="range"
                                value={formattedDays}
                                handleChange={(_, value) =>
                                    handleChange(id, { ...item, range: value })
                                }
                                options={dayOptions}
                                required
                            />
                        </Field>
                    </div>
                );
            })}
        </div>
    );
};

export default PayRateItemForm;
