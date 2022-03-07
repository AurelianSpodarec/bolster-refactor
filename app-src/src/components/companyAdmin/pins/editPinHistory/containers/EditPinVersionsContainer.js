import React from 'react';
import { useSelector } from 'react-redux';
import EditPinVersions from '../presentational/EditPinVersions';
import { selectTemplateVersion } from '../../../../../selectors/companyAdmin/templateVersions';

const EditPinVersionsContainer = ({ templateVersionID }) => {
    const selectedVersion = useSelector(state => selectTemplateVersion(state, templateVersionID));
    return <EditPinVersions selectedVersion={selectedVersion} />;
};

export default EditPinVersionsContainer;
