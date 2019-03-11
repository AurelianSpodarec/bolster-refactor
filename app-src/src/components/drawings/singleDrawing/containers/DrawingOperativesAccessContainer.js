import React, { Component } from 'react';

import OperativesTable from 'components/shared/operatives/presentational/OperativesTable';

class DrawingOperativesAccessContainer extends Component {
    render() {
        const operatives = [
            {
                id: 1,
                name: 'Jamie McMullan',
                email: 'jamie@silverchip.com'
            },
            {
                id: 2,
                name: 'Liam Bateman',
                email: 'liam@silverchip.com'
            },
            {
                id: 3,
                name: 'Charlotte Whelan',
                email: 'charlotte@silverchip.com'
            }
        ];

        return <OperativesTable operatives={operatives} />;
    }
}

export default DrawingOperativesAccessContainer;
