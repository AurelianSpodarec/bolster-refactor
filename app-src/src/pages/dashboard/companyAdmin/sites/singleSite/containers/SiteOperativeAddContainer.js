import React, { Component } from 'react';

import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import OperativesAdd from 'components_DEPRECATED/shared/operatives/presentational/OperativesAdd';

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
