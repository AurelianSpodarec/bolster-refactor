import React from 'react';
import { connect } from 'react-redux';
import EditPinVersions from '../presentational/EditPinVersions';

const EditPinVersionsContainer = ({ selectedVersion }) => (
    <EditPinVersions selectedVersion={selectedVersion} />
);

const mapStateToProps = (
    {
        companyAdmin: {
            templateVersionsReducer: { versions }
        }
    },
    ownProps
) => ({
    selectedVersion: {
        id: Object.values(versions).find(
            version => version.id === ownProps.templateVersionID
        ).id
    }
});

export default connect(mapStateToProps)(EditPinVersionsContainer);
