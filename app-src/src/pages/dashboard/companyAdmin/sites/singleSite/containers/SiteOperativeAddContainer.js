import React, { Component } from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import OperativesAdd from 'components/shared/operatives/presentational/OperativesAdd';

class SiteClientInviteContainer extends Component {
    render() {
        return (
            <BlockContainer>
                <OperativesAdd type="site" />
            </BlockContainer>
        );
    }
}

export default SiteClientInviteContainer;
