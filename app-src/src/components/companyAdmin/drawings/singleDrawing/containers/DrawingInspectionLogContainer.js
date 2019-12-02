import React, { useState } from 'react';
import { connect } from 'react-redux';

import DrawingInspectionLogsTable from '../presentational/DrawingInspectionLogsTable';
import withUpdateOnChange from 'components/companyAdmin/reports/createReport/components/hocs/withUpdateOnChange';

const DrawingInspectionLogContainer = ({ error, isFetching, onMobile, pins, getFilteredPins }) => {
    const [filterValue, setFilterValue] = useState('');

    return (
        <DrawingInspectionLogsTable
            isFetching={isFetching}
            error={error}
            pins={filterPinsFromSearch()}
            handleFilterChange={handleFilterChange}
            onMobile={onMobile}
        />
    );

    function filterPinsFromSearch() {
        const filteredPins = getFilteredPins(pins)
            .filter(({ pinCode = '' }) => pinCode.includes(filterValue))
            .sort((a, b) => {
                if (!a.pinCode || !b.pinCode) {
                    return 0;
                }
                return Number(a.pinCode.replace(':', '')) - Number(b.pinCode.replace(':', ''));
            });
        return filteredPins;
    }

    function handleFilterChange({ target: { value } }) {
        setFilterValue(value);
    }
};

const mapStateToProps = ({
    companyAdmin: {
        pinsReducer: { pins, isFetching, error },
    },
    shared: {
        mobileReducer: { onMobile },
    },
}) => ({
    pins: Object.values(pins),
    isFetching,
    error,
    onMobile,
});

export default withUpdateOnChange(connect(mapStateToProps)(DrawingInspectionLogContainer));
