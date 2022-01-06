import DatePickerContainer from 'components/shared/generic/form/containers/DatePickerContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import useStep1Options from './hooks/useStep1Options';
import React from 'react';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import Select from 'components/shared/generic/form/presentational/Select';
import moment from 'moment';

const CreatePinTaskStep1 = ({
    date,
    endDate,
    operative,
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
        operativeOptions,
        siteOptions,
        buildingOptions,
        floorOptions,
        drawingOptions,
    } = useStep1Options(handleChange, site, building, floor, drawing, operative);

    return (
        <>
            {isFetching && <Loading />}
            {fetchError && !isFetching && <p className="fetch-error">{fetchError}</p>}
            <div className="size-lg-12 step-block">
                <Field
                    name="date"
                    sizeClasses="size-lg-12"
                    label={!isRecurring ? 'Date' : 'Start Date'}
                    required
                >
                    <DatePickerContainer
                        name="date"
                        selected={new Date(date)}
                        onChange={value => handleChange('date', value)}
                        maxDate={
                            !isRecurring ? moment(new Date()).add(13, 'months').toDate() : undefined
                        }
                        required
                    />
                </Field>

                {isRecurring && (
                    <Field name="endDate" sizeClasses="size-lg-12" label="End Date" required>
                        <DatePickerContainer
                            name="endDate"
                            selected={new Date(endDate)}
                            onChange={value => handleChange('endDate', value)}
                            minDate={new Date(date)}
                            required
                        />
                    </Field>
                )}

                <Field name="operative" sizeClasses="size-lg-12" required>
                    <Select
                        name="operative"
                        value={operative}
                        onChange={handleChange}
                        options={operativeOptions}
                        disabled={isFetching || fetchError}
                        search
                        required
                    />
                </Field>

                <Field name="site" sizeClasses="size-lg-12" required>
                    <Select
                        name="site"
                        value={site}
                        onChange={handleChange}
                        options={siteOptions}
                        disabled={isFetching || fetchError || !operative}
                        search
                        required
                    />
                </Field>

                <Field name="building" sizeClasses="size-lg-12" required>
                    <Select
                        name="building"
                        value={building}
                        onChange={handleChange}
                        options={buildingOptions}
                        disabled={isFetching || fetchError || site == null}
                        search
                        required
                    />
                </Field>

                <Field name="floor" sizeClasses="size-lg-12" required>
                    <Select
                        name="floor"
                        value={floor}
                        onChange={handleChange}
                        options={floorOptions}
                        disabled={isFetching || fetchError || building == null}
                        search
                        required
                    />
                </Field>

                <Field name="drawing" sizeClasses="size-lg-12" required>
                    <Select
                        name="drawing"
                        value={drawing}
                        onChange={handleChange}
                        options={drawingOptions}
                        disabled={isFetching || fetchError || floor == null}
                        search
                        required
                    />
                </Field>
            </div>
        </>
    );
};

export default CreatePinTaskStep1;
