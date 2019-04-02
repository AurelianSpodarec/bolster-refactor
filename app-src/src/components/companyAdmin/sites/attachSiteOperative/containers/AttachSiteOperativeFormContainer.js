import React, { Component } from 'react';

import AttachOperativesForm from 'components/shared/operatives/presentational/AttachOperativeForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class AttachSiteOperativeFromContainer extends Component {
    render() {
        return (
            <BlockContainer>
                <AttachOperativesForm />
            </BlockContainer>
        );
    }
}

export default AttachSiteOperativeFromContainer;
