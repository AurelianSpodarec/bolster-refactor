import React, { Component } from 'react';

import CompaniesAccessContainer from 'components/shared/companies/containers/CompaniesAccessContainer';

class SiteCompaniesAccessTableContainer extends Component {
    render() {
        return <CompaniesAccessContainer hierarchyType="site" />;
    }
}

export default SiteCompaniesAccessTableContainer;
