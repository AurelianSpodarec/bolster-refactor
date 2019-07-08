import React from 'react';
import AddPinSectionsContainer from '../containers/AddPinSectionsContainer';

const AddPinVersions = ({ selectedVersion, isHistory }) => (
    <div className="size-lg-12">
        {selectedVersion && (
            <AddPinSectionsContainer
                selectedVersionID={selectedVersion.id}
                selectedVersion={selectedVersion}
                isHistory={isHistory}
            />
        )}
    </div>
);

export default AddPinVersions;
