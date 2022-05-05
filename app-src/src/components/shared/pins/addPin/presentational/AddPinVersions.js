import React from 'react';
import AddPinSectionsContainer from '../containers/AddPinSectionsContainer';

const AddPinVersions = ({
    selectedVersion,
    isHistory,
    isSameTemplate,
    pinAnswersByGroupKey,
    oldAnswersByNameObj,
    template,
    latestPinHistory,
    pinOptions,
    drawingID,
}) => (
    <div className="size-lg-12">
        {selectedVersion && (
            <AddPinSectionsContainer
                selectedVersionID={selectedVersion.id}
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
        )}
    </div>
);

export default AddPinVersions;
