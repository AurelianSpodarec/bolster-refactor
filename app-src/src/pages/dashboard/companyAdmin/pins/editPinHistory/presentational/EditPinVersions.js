import React from 'react';
import EditPinSectionsContainer from '../containers/EditPinSectionsContainer';

const EditPinVersions = ({ selectedVersion, pinOptions, drawingID }) => (
    <div className="size-lg-12">
        {!!selectedVersion && (
            <EditPinSectionsContainer
                selectedVersionID={selectedVersion.id}
                selectedVersion={selectedVersion}
                pinOptions={pinOptions}
                drawingID={drawingID}
            />
        )}
    </div>
);

export default EditPinVersions;
