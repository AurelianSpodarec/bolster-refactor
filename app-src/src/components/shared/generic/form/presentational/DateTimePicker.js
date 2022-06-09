import React from 'react';
import Datetime from 'react-datetime';

const DateTimePicker = ({
    id,
    value,
    onChange,
    placeholder,
    onBlur = () => {},
    sizeClasses = 'size-lg-12',
    error,
    useUtc,
    fixPickerToTop,
}) => (
    <div className={`date-picker ${sizeClasses}`}>
        <Datetime
            value={value}
            onChange={onChange}
            utc={useUtc}
            dateFormat="DD/MM/YYYY"
            className={fixPickerToTop ? 'picker-on-top' : null}
            inputProps={{
                id,
                placeholder,
                onBlur,
            }}
        />
        {!!(error && error.length) && <p className="error red-text text-accent-4">{error}</p>}

        <i className="far fa-calendar" />
    </div>
);

export default DateTimePicker;
