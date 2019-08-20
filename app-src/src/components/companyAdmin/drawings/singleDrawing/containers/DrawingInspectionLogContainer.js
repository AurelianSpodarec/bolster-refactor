import React, { Component } from 'react';
import { connect } from 'react-redux';

import DrawingInspectionLogsTable from '../presentational/DrawingInspectionLogsTable';

class DrawingInspectionLogContainer extends Component {
    state = {
        filterValue: ''
    };

    render() {
        const { pins, isFetching, error, onMobile } = this.props;
        const filterPins = pins
            .filter(({ pinCode = '' }) =>
                pinCode.includes(this.state.filterValue)
            ).sort((a, b) => {
                if(!a.pinCode || !b.pinCode) {
                    return 0;
                }
                return Number(a.pinCode.replace(':', '')) - Number(b.pinCode.replace(':', ''));
            });

        return (
            <DrawingInspectionLogsTable
                isFetching={isFetching}
                error={error}
                pins={filterPins}
                handleFilterChange={this.handleFilterChange}
                onMobile={onMobile}
            />
        );
    }

    handleFilterChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
}

const mapStateToProps = ({
    companyAdmin: {
        pinsReducer: { pins, isFetching, error },
        inspectionLogsReducer: {
            inspectionLogs,
            isFetching: fetchingLogs,
            error: inspectionError
        }
    },
    shared: {
        mobileReducer: { onMobile }
    }
}) => ({
    pins: Object.values(pins) || [],
    isFetching: isFetching,
    error: error,
    inspectionLogs: Object.values(inspectionLogs),
    fetchingLogs,
    inspectionError,
    onMobile
});

export default connect(mapStateToProps)(DrawingInspectionLogContainer);
