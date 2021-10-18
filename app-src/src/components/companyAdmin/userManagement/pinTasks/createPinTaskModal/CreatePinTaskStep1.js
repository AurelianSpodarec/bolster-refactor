import DatePickerContainer from 'components/shared/generic/form/containers/DatePickerContainer';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import Field from 'components/shared/generic/form/presentational/Field';
import useStep1Options from './hooks/useStep1Options';
import React from 'react';
import Loading from 'components/shared/generic/misc/presentational/Loading';

const CreatePinTaskStep1 = ({
    date,
    operatives,
    site,
    building,
    floor,
    drawing,
    handleChange,
    isNotRecurring,
}) => {
    const {
        isFetching,
        fetchError,
        operativesOptions,
        siteOptions,
        buildingOptions,
        floorOptions,
        drawingOptions,
    } = useStep1Options(site, building, floor);

    return (
        <>
            {isFetching && <Loading />}
            {fetchError && <p className="fetch-error">{fetchError}</p>}
            <div className="size-lg-12 step-block">
                <Field
                    name="date"
                    sizeClasses="size-lg-12"
                    label={isNotRecurring ? 'Date' : 'Start Date'}
                >
                    <DatePickerContainer
                        name="date"
                        selected={new Date(date)}
                        onChange={value => handleChange('date', value)}
                        required
                    />
                </Field>

                <Field name="operatives" sizeClasses="size-lg-12">
                    <MultiSelect
                        name="operatives"
                        value={operatives}
                        onChange={handleChange}
                        options={operativesOptions}
                        disabled={isFetching || fetchError}
                    />
                </Field>

                <Field name="site" sizeClasses="size-lg-12">
                    <DropdownContainer
                        name="site"
                        value={siteOptions.find(({ value }) => value == site)}
                        handleChange={handleChange}
                        options={siteOptions}
                        disabled={isFetching || fetchError}
                        required
                    />
                </Field>

                <Field name="building" sizeClasses="size-lg-12">
                    <DropdownContainer
                        name="building"
                        value={buildingOptions.find(({ value }) => value == building)}
                        handleChange={handleChange}
                        options={buildingOptions}
                        disabled={isFetching || fetchError || !site}
                        required
                    />
                </Field>

                <Field name="floor" sizeClasses="size-lg-12">
                    <DropdownContainer
                        name="floor"
                        value={floorOptions.find(({ value }) => value == floor)}
                        handleChange={handleChange}
                        options={floorOptions}
                        disabled={isFetching || fetchError || !building}
                        required
                    />
                </Field>

                <Field name="drawing" sizeClasses="size-lg-12">
                    <DropdownContainer
                        name="drawing"
                        value={drawingOptions.find(({ value }) => value == drawing)}
                        handleChange={handleChange}
                        options={drawingOptions}
                        disabled={isFetching || fetchError || !floor}
                        required
                    />
                </Field>
            </div>
        </>
    );
};

export default CreatePinTaskStep1;
