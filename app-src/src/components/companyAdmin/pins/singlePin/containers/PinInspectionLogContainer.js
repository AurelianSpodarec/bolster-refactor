import React, { Component } from 'react';
import { connect } from 'react-redux';

import PinInspectionLogTable from '../presentational/PinInspectionLogsTable';

class PinInspectionLogContainer extends Component {
    state = {
        filterValue: ''
    };

    render() {
        const { pins, isFetching, error, onMobile } = this.props;
        const filterPins = pins
            .filter(({ pinCode = '' }) =>
                pinCode.includes(this.state.filterValue)
            )
            .sort((a, b) => {
                return a.pinCode.split(':')[0] - b.pinCode.split(':')[0];
            });

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
        pinsReducer: { pins, isFetchingForInspection, isFetching, error }
    },
    shared: {
        mobileReducer: { onMobile }
    }
}) => ({
    pins: Object.values(pins),
    isFetching: isFetchingForInspection || isFetching,
    error: error,
    onMobile
});

export default connect(mapStateToProps)(PinInspectionLogContainer);
