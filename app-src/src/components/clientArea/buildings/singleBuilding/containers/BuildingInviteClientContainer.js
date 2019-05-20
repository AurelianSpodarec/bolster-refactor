import React, { Component } from 'react';
import ClientInvite from 'components/shared/clients/presentational/ClientInvite';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

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
