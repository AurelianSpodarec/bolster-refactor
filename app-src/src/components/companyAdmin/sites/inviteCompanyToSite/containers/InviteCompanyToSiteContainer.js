import React, { Component } from 'react';

import InviteCompanyFormContainer from 'components/shared/companies/containers/InviteCompanyFormContainer';

class InviteCompanyToSiteContainer extends Component {
    render() {
        return <InviteCompanyFormContainer hierarchyType="site" />;
    }
}

export default InviteCompanyToSiteContainer;
