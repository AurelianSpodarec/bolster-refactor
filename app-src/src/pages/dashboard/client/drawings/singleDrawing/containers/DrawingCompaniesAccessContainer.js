import React, { Component } from 'react';

import CompaniesAccessContainer from 'pages/dashboard/client/shared/companies/containers/ClientCompaniesAccessContainer';

class DrawingCompaniesAccessContainer extends Component {
    render() {
        return <CompaniesAccessContainer smallPod={true} hierarchyType="drawing" />;
    }
}

export default DrawingCompaniesAccessContainer;
