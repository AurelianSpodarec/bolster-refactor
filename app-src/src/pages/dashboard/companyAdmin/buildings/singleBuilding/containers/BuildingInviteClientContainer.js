import React, { Component } from 'react';
import ClientInvite from 'components_DEPRECATED/shared/clients/presentational/ClientInvite';
import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';

class BuildingInviteClientContainer extends Component {
    render() {
        return (
            <BlockContainer>
                <ClientInvite type="building" />
            </BlockContainer>
        );
    }
}

export default BuildingInviteClientContainer;
