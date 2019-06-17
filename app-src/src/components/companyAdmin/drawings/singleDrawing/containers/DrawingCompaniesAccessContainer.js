import React, { Component } from 'react';

import CompaniesAccessContainer from 'components/shared/companies/containers/CompaniesAccessContainer';

class DrawingCompaniesAccessContainer extends Component {
    render() {
        const { accessType } = this.props;
        return (
            <CompaniesAccessContainer
                smallPod={true}
                hierarchyType="drawing"
                accessType={accessType}
            />
        );
    }
}

export default DrawingCompaniesAccessContainer;
