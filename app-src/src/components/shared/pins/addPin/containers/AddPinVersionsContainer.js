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
    ownProps
) => ({
    selectedVersion: versions[ownProps.templateVersionID]
});

export default connect(mapStateToProps)(AddPinVersionsContainer);
