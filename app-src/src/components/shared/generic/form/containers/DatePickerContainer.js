import React from "react";
import { connect } from "react-redux";

import DatePickerPresentational from "../presentational/DatePicker";

const DatePickerContainer = ({
    selected,
    onChange,
    name,
    placeholderText = `Please select ${name}`,
    required = true,
    onBlur = () => {},
    sizeClasses = "size-lg-12",
    minDate,
    maxDate,
    showTimeSelect = false,
    isIE10
}) => (
    <DatePickerPresentational
        name={name}
        selected={selected}
        onChange={onChange}
        placeholderText={placeholderText}
        required={required}
        onBlur={onBlur}
        minDate={minDate}
        maxDate={maxDate}
        showTimeSelect={showTimeSelect}
        sizeClasses={sizeClasses}
        isIE10={isIE10}
    ></DatePickerPresentational>
);

const mapStateToProps = ({
    shared: {
        isIE10Reducer: { isIE10 }
    }
}) => ({
    isIE10
});

export default connect(mapStateToProps)(DatePickerContainer);
