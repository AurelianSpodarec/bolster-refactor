import React, { Component } from 'react';

import AttachOperativesForm from '../presentational/AttachOperativeForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class AttachOperativesFormContainer extends Component {
    render() {
        return (
            <BlockContainer>
                <AttachOperativesForm />
            </BlockContainer>
        );
    }
}

export default AttachOperativesFormContainer;
