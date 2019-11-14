import React from 'react';
import AddPinSectionsContainer from '../containers/AddPinSectionsContainer';

const AddPinVersions = ({ 
    selectedVersion, 
    isHistory, 
    isSameTemplate, 
    pinAnswersByGroupKey, 
    dropdownOptionsByType, 
    oldAnswersByNameObj, 
    template,
    latestPinHistory,
}) => (
    <div className="size-lg-12">
        {selectedVersion && (
            <AddPinSectionsContainer
                selectedVersionID={selectedVersion.id}
                selectedVersion={selectedVersion}
                isHistory={isHistory}
                isSameTemplate={isSameTemplate}
                pinAnswersByGroupKey={pinAnswersByGroupKey}
                dropdownOptionsByType={dropdownOptionsByType}
                oldAnswersByNameObj={oldAnswersByNameObj}
                template={template}
                latestPinHistory={latestPinHistory}
            />
        )}
    </div>
);

export default AddPinVersions;
