import React, { Component } from 'react';
import { connect } from 'react-redux';

import DrawingInspectionLogsTable from '../presentational/DrawingInspectionLogsTable';
import fetchInspectionLogs from 'actions/companyAdmin/drawings/async/fetchInspectionLogs';

class DrawingInspectionLogContainer extends Component {
    state = {
        filterValue: ''
    };

    render() {
        const { pins, isFetching, error } = this.props;

        const filterPins = Object.values(pins).filter(
            pin => pin.pinCode.includes(this.state.filterValue)
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

    componentDidMount = () => {
        this.props.fetchInspectionLogs();
    };

    handleFilterChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
}

const mapStateToProps = ({ companyAdmin: { pinsReducer: { pins, isFetching, error }, } }) => ({
    pins: Object.values(pins),
    isFetching: isFetching,
    error: error
});

const mapDispatchToProps = dispatch => ({
    fetchInspectionLogs: () => {
        dispatch(fetchInspectionLogs());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawingInspectionLogContainer);
