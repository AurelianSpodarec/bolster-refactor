import React from 'react';
import { connect } from 'react-redux';
import AddPinVersions from '../presentational/AddPinVersions';

const AddPinVersionsContainer = ({
     selectedVersion, 
     template, 
     isHistory, 
     isSameTemplate, 
     pinAnswersByGroupKey, 
     dropdownOptionsByType, 
     oldAnswersByNameObj
}) => 
    (
        <AddPinVersions
            selectedVersion={selectedVersion}
            isHistory={isHistory}
            isSameTemplate={isSameTemplate}
            pinAnswersByGroupKey={pinAnswersByGroupKey}
            dropdownOptionsByType={dropdownOptionsByType}
            oldAnswersByNameObj={oldAnswersByNameObj}
            template={template}
        />
    );


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
        selectedVersion: versions[template.latestVersionID] || {},
        template
    };
};

export default connect(mapStateToProps)(AddPinVersionsContainer);
