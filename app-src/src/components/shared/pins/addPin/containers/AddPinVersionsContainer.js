import React from 'react';
import { connect } from 'react-redux';
import AddPinVersions from '../presentational/AddPinVersions';

const AddPinVersionsContainer = ({ selectedVersion, isHistory }) => {
    return (
        <AddPinVersions
            selectedVersion={selectedVersion}
            isHistory={isHistory}
        />
    );
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
