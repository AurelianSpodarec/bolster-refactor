import DatePickerContainer from 'components/shared/generic/form/containers/DatePickerContainer';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import Field from 'components/shared/generic/form/presentational/Field';
import useStep1Options from './hooks/useStep1Options';
import React from 'react';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import Select from 'components/shared/generic/form/presentational/Select';

const CreatePinTaskStep1 = ({
    date,
    operatives,
    site,
    building,
    floor,
    drawing,
    handleChange,
    isRecurring,
}) => {
    const {
        isFetching,
        fetchError,
        operativesOptions,
        siteOptions,
        buildingOptions,
        floorOptions,
        drawingOptions,
    } = useStep1Options(handleChange, site, building, floor, drawing);

    return (
        <>
            {isFetching && <Loading />}
            {fetchError && !isFetching && <p className="fetch-error">{fetchError}</p>}
            <div className="size-lg-12 step-block">
                <Field
                    name="date"
                    sizeClasses="size-lg-12"
                    label={!isRecurring ? 'Date' : 'Start Date'}
                >
                    <DatePickerContainer
                        name="date"
                        selected={new Date(date)}
                        onChange={value => handleChange('date', value)}
                        required
                    />
                </Field>

                {isRecurring && (
                    <Field name="end-date" sizeClasses="size-lg-12" label="End Date">
                        <DatePickerContainer
                            name="end-date"
                            selected={new Date(date)}
                            onChange={value => handleChange('end-date', value)}
                            required
                        />
                    </Field>
                )}

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
                    <Select
                        name="site"
                        value={site}
                        onChange={handleChange}
                        options={siteOptions}
                        disabled={isFetching || fetchError}
                        search
                        required
                    />
                </Field>

                <Field name="building" sizeClasses="size-lg-12">
                    <Select
                        name="building"
                        value={building}
                        onChange={handleChange}
                        options={buildingOptions}
                        disabled={isFetching || fetchError || !site}
                        search
                        required
                    />
                </Field>

                <Field name="floor" sizeClasses="size-lg-12">
                    <Select
                        name="floor"
                        value={floor}
                        onChange={handleChange}
                        options={floorOptions}
                        disabled={isFetching || fetchError || !building}
                        search
                        required
                    />
                </Field>

                <Field name="drawing" sizeClasses="size-lg-12">
                    <Select
                        name="drawing"
                        value={drawing}
                        onChange={handleChange}
                        options={drawingOptions}
                        disabled={isFetching || fetchError || !floor}
                        search
                        required
                    />
                </Field>
            </div>
        </>
    );
};

export default CreatePinTaskStep1;
