import React, { Component } from 'react';
import { connect } from 'react-redux';

import DrawingInspectionLogsTable from '../presentational/DrawingInspectionLogsTable';

class DrawingInspectionLogContainer extends Component {
    state = {
        filterValue: '',
    };

    render() {
        const { pins, isFetching, error } = this.props;
        const filterPins = pins
            .filter(({ pinCode = '' }) => pinCode.includes(this.state.filterValue))
            .sort((a, b) => {
                if (!a.pinCode || !b.pinCode) {
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
            />
        );
    }

    handleFilterChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
}

const mapStateToProps = ({
    client: {
        pinsReducer: { pins, isFetching, error },
    },
}) => ({
    pins: Object.values(pins),
    isFetching: isFetching,
    error: error,
});

export default connect(mapStateToProps)(DrawingInspectionLogContainer);
