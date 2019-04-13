import React from 'react';
import AddPinSectionsContainer from '../containers/AddPinSectionsContainer';

const AddPinVersions = ({ selectedVersion }) => (
    <div className="size-lg-12">
        {selectedVersion && (
            <AddPinSectionsContainer selectedVersionID={selectedVersion.id} />
        )}
    </div>
);

export default AddPinVersions;
