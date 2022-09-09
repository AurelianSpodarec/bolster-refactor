import React, { Component } from 'react';

import InviteClientFormContainer from 'components/shared/clients/containers/InviteClientFormContainer';

class InviteClientToFloorContainer extends Component {
    render() {
        return <InviteClientFormContainer hierarchyType="floor" />;
    }
}

export default InviteClientToFloorContainer;
