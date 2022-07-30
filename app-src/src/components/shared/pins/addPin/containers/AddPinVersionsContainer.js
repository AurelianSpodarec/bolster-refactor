import React from 'react';
import { connect } from 'react-redux';
import AddPinVersions from '../presentational/AddPinVersions';

const AddPinVersionsContainer = ({
    selectedVersion,
    template,
    isHistory,
    isSameTemplate,
    pinAnswersByGroupKey,
    oldAnswersByNameObj,
    latestPinHistory,
    pinOptions,
    drawingID,
}) => (
    <AddPinVersions
        selectedVersion={selectedVersion}
        isHistory={isHistory}
        isSameTemplate={isSameTemplate}
        pinAnswersByGroupKey={pinAnswersByGroupKey}
        oldAnswersByNameObj={oldAnswersByNameObj}
        template={template}
        latestPinHistory={latestPinHistory}
        pinOptions={pinOptions}
        drawingID={drawingID}
    />
);

const mapStateToProps = (
    {
        companyAdmin: {
            templateVersionsReducer: { versions },
            templatesReducer: { templates },
        },
    },
    ownProps,
) => {
    const template = templates[ownProps.selectedTemplateID] || {};
    return {
        selectedVersion: versions[template.latestVersionID] || {},
        template,
    };
};

export default connect(mapStateToProps)(AddPinVersionsContainer);
