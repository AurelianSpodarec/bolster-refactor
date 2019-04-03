import React, { Component } from 'react';

import InviteCompanyFormContainer from 'components/shared/companies/containers/InviteCompanyFormContainer';

class InviteCompanyToBuildingContainer extends Component {
    render() {
        return <InviteCompanyFormContainer hierarchyType="building" />;
    }
}

export default InviteCompanyToBuildingContainer;
