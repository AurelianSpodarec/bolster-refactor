import React, { Component } from 'react';
import { connect } from 'react-redux';

import AttachOperativesFormContainer from 'components/shared/operatives/containers/AttachOperativesFormContainer';
import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';

class AttachFloorOperativeContainer extends Component {
    render() {
        return (
            <AttachOperativesFormContainer
                hierarchyType={HIERARCHY_IDS.FLOOR}
            />
        );
    }
}

export default connect()(AttachFloorOperativeContainer);
