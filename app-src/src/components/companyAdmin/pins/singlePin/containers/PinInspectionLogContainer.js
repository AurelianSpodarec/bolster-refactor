import React, { Component } from 'react';
import { connect } from 'react-redux';

import PinInspectionLogTable from '../present../presentational/PinInspectionLogsTableTable

class PinInspectionLogContainer extends Component {
    state = {
        filterValue: ''
    };

    render() {
        const { pins, isFetching, error, onMobile } = this.props;
        const filterPins = pins.filter(({ pinCode = '' }) =>
            pinCode.includes(this.state.filterValue)
        );

        return (
            <PinInspectionLogTable
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
    pins: Object.values(pins),
    isFetching: isFetching,
    error: error,
    inspectionLogs: Object.values(inspectionLogs),
    fetchingLogs,
    inspectionError,
    onMobile
});

export default connect(mapStateToProps)(PinInspectionLogContainer);
