import DatePickerContainer from 'components/shared/generic/form/containers/DatePickerContainer';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import Field from 'components/shared/generic/form/presentational/Field';
import React from 'react';

const CreatePinTaskStep1 = ({
    date,
    operatives,
    building,
    floor,
    drawing,
    handleChange,
    isNotRecurring,
}) => {
    const operativesOptions = []; // optional - multi
    const siteOptions = []; //  required
    const buildingOptions = []; // required
    const floorOptions = []; // required
    const drawingOptions = []; // required

    return (
        <div className="size-lg-12 step-block">
            <Field
                name="date"
                sizeClasses="size-lg-12"
                label={isNotRecurring ? 'Date' : 'Start Date'}
            >
                <DatePickerContainer
                    name="date"
                    selected={new Date(date)}
                    onChange={value => handleChange('name', value)}
                    required
                />
            </Field>

            <Field name="operatives" sizeClasses="size-lg-12">
                <MultiSelect
                    name="site"
                    value={operativesOptions.find(option => option.value === operatives)}
                    handleChange={handleChange}
                    options={operativesOptions}
                />
            </Field>

            <Field name="site" sizeClasses="size-lg-12">
                <DropdownContainer
                    name="site"
                    value={siteOptions.find(option => option.value === site)}
                    handleChange={handleChange}
                    options={siteOptions}
                    required
                />
            </Field>

            <Field name="building" sizeClasses="size-lg-12">
                <DropdownContainer
                    name="building"
                    value={buildingOptions.find(option => option.value === building)}
                    handleChange={handleChange}
                    options={buildingOptions}
                    required
                />
            </Field>

            <Field name="floor" sizeClasses="size-lg-12">
                <DropdownContainer
                    name="floor"
                    value={floorOptions.find(option => option.value === floor)}
                    handleChange={handleChange}
                    options={floorOptions}
                    required
                />
            </Field>

            <Field name="drawing" sizeClasses="size-lg-12">
                <DropdownContainer
                    name="drawing"
                    value={drawingOptions.find(option => option.value === drawing)}
                    handleChange={handleChange}
                    options={drawingOptions}
                    required
                />
            </Field>
        </div>
    );
};

export default CreatePinTaskStep1;
