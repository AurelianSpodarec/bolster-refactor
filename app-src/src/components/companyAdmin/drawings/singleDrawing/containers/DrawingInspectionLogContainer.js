import React, { Component } from 'react';
import { connect } from 'react-redux';

import DrawingInspectionLogsTable from '../presentational/DrawingInspectionLogsTable';

class DrawingInspectionLogContainer extends Component {
    state = {
        filterValue: ''
    };

    render() {
        const { pins, isFetching, error } = this.props;
        const filterPins = pins.filter(({ pinCode }) =>
            pinCode.includes(this.state.filterValue)
        );

        return (
            <DrawingInspectionLogsTable
                isFetching={isFetching}
                error={error}
                pins={filterPins}
                handleFilterChange={this.handleFilterChange}
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
    }
}) => ({
    pins: Object.values(pins),
    isFetching: isFetching,
    error: error,
    inspectionLogs: Object.values(inspectionLogs),
    fetchingLogs,
    inspectionError
});

export default connect(mapStateToProps)(DrawingInspectionLogContainer);
