import React, { Component } from 'react';

import DrawingInspectionLogsTable from '../presentational/DrawingInspectionLogsTable';

class DrawingInspectionLogContainer extends Component {
    state = {
        filterValue: ''
    };

    render() {
        const tableHeaders = ['Pin ID', 'Status', 'Action'];

        const inspectionLogs = [
            {
                id: '1',
                name: '0000:23',
                status: 'Installed',
                link: '',
                updated: '08/03/2019 13:23:44'
            },
            {
                id: '2',
                name: '0000:24',
                status: 'Inspected',
                link: '',
                updated: '08/03/2019 13:28:44'
            },
            {
                id: '3',
                name: '0000:25',
                status: 'Installed',
                link: '',
                updated: '08/03/2019 13:17:44'
            },
            {
                id: '4',
                name: '0000:26',
                status: 'Inspected',
                link: '',
                updated: '08/03/2019 13:26:44'
            },
            {
                id: '5',
                name: '0000:27',
                status: 'Installed',
                link: '',
                updated: '08/03/2019 13:37:44'
            },
            {
                id: '6',
                name: '0000:28',
                status: 'Inspected',
                link: '',
                updated: '08/03/2019 13:20:44'
            },
            {
                id: '7',
                name: '0000:29',
                status: 'Installed',
                link: '',
                updated: '08/03/2019 13:42:44'
            },
            {
                id: '8',
                name: '0000:30',
                status: 'Inspected',
                link: '',
                updated: '08/03/2019 13:16:44'
            }
        ];

        const { isFetching, error } = this.props;

        return (
            <DrawingInspectionLogsTable
                headers={tableHeaders}
                isFetching={isFetching}
                error={error}
                inspectionLogs={inspectionLogs}
                handleFilterChange={this.handleFilterChange}
            />
        );
    }

    handleFilterChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    };
}

export default DrawingInspectionLogContainer;
