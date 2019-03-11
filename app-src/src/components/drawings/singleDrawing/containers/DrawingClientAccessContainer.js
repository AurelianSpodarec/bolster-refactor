import React, { Component } from 'react';

import ClientsTable from 'components/shared/clients/presentational/ClientsTable';

class DrawingClientAccessContainer extends Component {
    render() {
        const clients = [
            {
                id: 1,
                name: 'Jamie McMullan',
                company: 'Silverchip',
                types: ['Firestopping', 'Asbestos', 'Doors']
            },
            {
                id: 2,
                name: 'Liam Bateman',
                company: 'Silverchip',
                types: ['Firestopping', 'Asbestos', 'Doors']
            },
            {
                id: 3,
                name: 'Charlotte Whelan',
                company: 'Silverchip',
                types: ['Firestopping', 'Asbestos', 'Doors']
            }
        ];

        return <ClientsTable clients={clients} />;
    }
}

export default DrawingClientAccessContainer;
