import React, { Component } from 'react';

import InviteClientFormContainer from 'components/shared/clients/containers/InviteClientFormContainer';

class InviteClientToBuildingContainer extends Component {
    render() {
        return <InviteClientFormContainer hierarchyType="building" />;
    }
}

export default InviteClientToBuildingContainer;
