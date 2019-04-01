import React, { Component } from 'react';
import { connect } from 'react-redux';

import DrawingInspectionLogsTable from '../presentational/DrawingInspectionLogsTable';
import fetchInspectionLogs from 'actions/drawings/async/fetchInspectionLogs';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class DrawingInspectionLogContainer extends Component {
    state = {
        filterValue: ''
    };

    render() {
        const tableHeaders = ['Pin ID', 'Status', 'Actions'];

        const { inspectionLogs, isFetching, error } = this.props;

        const filteredInspectionLogs = Object.values(inspectionLogs).filter(
            log => log.name.includes(this.state.filterValue)
        );

        return (
            <BlockContainer>
                <DrawingInspectionLogsTable
                    headers={tableHeaders}
                    isFetching={isFetching}
                    error={error}
                    inspectionLogs={filteredInspectionLogs}
                    handleFilterChange={this.handleFilterChange}
                />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        this.props.fetchInspectionLogs();
    };

    handleFilterChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    };
}

const mapStateToProps = ({ inspectionLogsReducer }) => ({
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
