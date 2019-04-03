import React, { Component } from 'react';

import InviteCompanyFormContainer from 'components/shared/companies/containers/InviteCompanyFormContainer';

class InviteCompanyToFloorContainer extends Component {
    render() {
        return <InviteCompanyFormContainer hierarchyType="floor" />;
    }
}

export default InviteCompanyToFloorContainer;
