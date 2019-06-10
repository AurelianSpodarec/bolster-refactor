import React, { Component } from 'react';
import { connect } from 'react-redux';

import DocumentResponses from '../presentational/DocumentResponses';

class DocumentResponsesContainer extends Component {
    render = () => {
        const sampleDocument = {
            agreeanceEveryXDays: 0,
            createdByCompanyUserID: 1,
            createdOn: '2019-06-10T10:52:14',
            endOn: '2019-07-05T23:00:00',
            fileS3Key:
                'd031e1ab-0aed-4f49-b7bc-2facff143396/60mm-ablative-coated-batt.pdf',
            id: 3,
            isFileViewRequired: false,
            isPhotoRequired: false,
            isSignatureRequired: false,
            isUpsyncForced: false,
            name: '60mm Ablative Coated Batt',
            serviceIDs: Array[1],
            startOn: '2019-06-09T23:00:00',
            type: 1
        };
        return <DocumentResponses document={sampleDocument} />;
    };
}

const mapDispatchToProps = {};

export default connect(
    null,
    mapDispatchToProps
)(DocumentResponsesContainer);
