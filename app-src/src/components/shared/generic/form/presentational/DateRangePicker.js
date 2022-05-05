import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import ActionButton from '../../button/presentational/ActionButton';

function DateRangePickerInput({
    name,
    value, // { startDate: Date, endDate: Date }
    onChange = () => {},
    // required = false,
    minDate, // Date
    maxDate, // Date
    text,
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const valueObj = {
        startDate: value.startDate,
        endDate: value.endDate,
        key: 'selection',
    };

    const _handleChange = ranges => {
        const { key, ...selection } = ranges.selection;
        onChange(name, selection);
    };

    return (
        <div className="date-range-picker-container">
            <ActionButton icon="calendar" onClick={() => setIsExpanded(!isExpanded)} text={text} />
            {isExpanded && (
                <div className="date-range-picker-overlay" onClick={() => setIsExpanded(false)} />
            )}
            <div className={`expandable-date-range-picker ${isExpanded ? 'active' : ''}`}>
                <DateRangePicker
                    // locale={locale}
                    ranges={[valueObj]}
                    onChange={_handleChange}
                    staticRanges={[]}
                    inputRanges={[]}
                    minDate={minDate}
                    maxDate={maxDate}
                />
            </div>
        </div>
    );
}

export default DateRangePickerInput;
