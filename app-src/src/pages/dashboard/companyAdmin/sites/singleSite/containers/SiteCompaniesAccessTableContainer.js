import React, { Component } from 'react';

import CompaniesAccessContainer from 'components_DEPRECATED/shared/companies/containers/CompaniesAccessContainer';

class SiteCompaniesAccessTableContainer extends Component {
    render() {
        const { accessType } = this.props;
        return (
            <CompaniesAccessContainer
                hierarchyType="site"
                accessType={accessType}
                smallList={true}
            />
        );
    }
}

export default SiteCompaniesAccessTableContainer;
