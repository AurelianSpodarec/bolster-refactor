import React, { Component } from 'react';

import CompaniesAccessContainer from 'components/shared/companies/containers/CompaniesAccessContainer';

class DrawingCompaniesAccessContainer extends Component {
    render() {
        return <CompaniesAccessContainer hierarchyType="drawing" />;
    }
}

export default DrawingCompaniesAccessContainer;
