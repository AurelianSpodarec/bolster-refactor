import React, { Component } from 'react';
import { connect } from 'react-redux';

import AttachOperativesFormContainer from 'components/shared/operatives/containers/AttachOperativesFormContainer';
import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';

class AttachDrawingOperativeFormContainer extends Component {
    render() {
        return (
            <AttachOperativesFormContainer
                hierarchyType={HIERARCHY_IDS.DRAWING}
            />
        );
    }
}

export default connect()(AttachDrawingOperativeFormContainer);
