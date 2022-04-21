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
    pinOptions,
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
                pinOptions={pinOptions}
            />
        )}
    </div>
);

export default AddPinVersions;
