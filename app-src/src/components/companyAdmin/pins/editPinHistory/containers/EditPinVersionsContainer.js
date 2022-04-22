import React from 'react';
import { useSelector } from 'react-redux';
import EditPinVersions from '../presentational/EditPinVersions';
import { selectTemplateVersion } from '../../../../../selectors/companyAdmin/templateVersions';

const EditPinVersionsContainer = ({ templateVersionID, pinOptions }) => {
    const selectedVersion = useSelector(state => selectTemplateVersion(state, templateVersionID));
    return <EditPinVersions selectedVersion={selectedVersion} pinOptions={pinOptions} />;
};

export default EditPinVersionsContainer;
