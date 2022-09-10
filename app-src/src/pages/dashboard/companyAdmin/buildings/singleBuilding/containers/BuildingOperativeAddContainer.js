import React, { Component } from 'react';
import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';

import OperativesAdd from 'components_DEPRECATED/shared/operatives/presentational/OperativesAdd';

class BuildingOperativesTableContainer extends Component {
    render() {
        return (
            <BlockContainer>
                <OperativesAdd type="building" />
            </BlockContainer>
        );
    }
}

export default BuildingOperativesTableContainer;
