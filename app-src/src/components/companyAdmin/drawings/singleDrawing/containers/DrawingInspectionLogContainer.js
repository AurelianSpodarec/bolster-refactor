import React, { Component } from 'react';
import { connect } from 'react-redux';

import DrawingInspectionLogsTable from '../presentational/DrawingInspectionLogsTable';
import fetchInspectionLogs from 'actions/companyAdmin/drawings/async/fetchInspectionLogs';

class DrawingInspectionLogContainer extends Component {
    state = {
        filterValue: ''
    };

    render() {
        const { inspectionLogs, isFetching, error } = this.props;

        const filteredInspectionLogs = Object.values(inspectionLogs).filter(
            log => log.name.includes(this.state.filterValue)
        );

        return (
            <DrawingInspectionLogsTable
                isFetching={isFetching}
                error={error}
                inspectionLogs={filteredInspectionLogs}
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

const mapStateToProps = ({ companyAdmin: { inspectionLogsReducer } }) => ({
    inspectionLogs: inspectionLogsReducer.inspectionLogs,
    isFetching: inspectionLogsReducer.isFetching,
    error: inspectionLogsReducer.error
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
