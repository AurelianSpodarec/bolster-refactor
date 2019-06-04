import React from 'react';
import EditPinSectionsContainer from '../containers/EditPinSectionsContainer';

const EditPinVersions = ({ selectedVersion }) => (
    <div className="size-lg-12">
        {!!selectedVersion && (
            <EditPinSectionsContainer
                selectedVersionID={selectedVersion.id}
                selectedVersion={selectedVersion}
            />
        )}
    </div>
);

export default EditPinVersions;
