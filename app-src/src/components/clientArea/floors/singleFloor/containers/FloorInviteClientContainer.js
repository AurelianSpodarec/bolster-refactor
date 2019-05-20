import React, { Component } from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import ClientInvite from 'components/shared/clients/presentational/ClientInvite';

class FloorInviteClientContainer extends Component {
    render() {
        return (
            <BlockContainer>
                <ClientInvite type="floor" />
            </BlockContainer>
        );
    }
}

export default FloorInviteClientContainer;
