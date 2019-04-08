import React, { Component } from 'react';
import { connect } from 'react-redux';

import AttachOperativesFormContainer from 'components/shared/operatives/containers/AttachOperativesFormContainer';

class AttachDrawingOperativeFormContainer extends Component {
    render() {
        return <AttachOperativesFormContainer hierarchyType="drawing" />;
    }
}

export default connect()(AttachDrawingOperativeFormContainer);
