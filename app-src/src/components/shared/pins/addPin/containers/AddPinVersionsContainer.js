import React from 'react';
import { connect } from 'react-redux';
import AddPinVersions from '../presentational/AddPinVersions';

const AddPinVersionsContainer = ({ selectedVersion }) => {
    return <AddPinVersions selectedVersion={selectedVersion} />;
};

const mapStateToProps = (
    {
        companyAdmin: {
            templateVersionsReducer: { versions },
            templatesReducer: { templates }
        }
    },
    ownProps
) => {
    const template = templates[ownProps.selectedTemplateID] || {};
    return {
        selectedVersion: versions[template.latestVersionID] || {}
    };
};

export default connect(mapStateToProps)(AddPinVersionsContainer);
