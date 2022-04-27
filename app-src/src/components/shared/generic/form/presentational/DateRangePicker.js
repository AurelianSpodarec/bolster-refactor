import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import ButtonContainer from '../../button/containers/ButtonContainer';
import ActionButton from '../../button/presentational/ActionButton';

function DateRangePickerInput({
    name,
    placeholder,
    value, // { startDate: Date, endDate: Date }
    onChange = () => {},
    required = false,
    minDate, // Date
    maxDate, // Date
    locale = 'en-GB',
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
            <ActionButton icon="calendar" onClick={() => setIsExpanded(!isExpanded)} />
            <div className={`expandable ${isExpanded ? 'active' : ''}`}>
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
