import React from 'react';
import { connect } from 'react-redux';
import AddPinVersions from '../presentational/AddPinVersions';

const AddPinVersionsContainer = ({ selectedVersion }) => (
    <AddPinVersions selectedVersion={selectedVersion} />
);
const mapStateToProps = (
    {
        companyAdmin: {
            templateVersionsReducer: { versions }
        }
    },
    { selectedTemplateID }
) => ({
    selectedVersion: Object.values(versions).find(
        version => version.templateID === selectedTemplateID
    )
});

export default connect(mapStateToProps)(AddPinVersionsContainer);
