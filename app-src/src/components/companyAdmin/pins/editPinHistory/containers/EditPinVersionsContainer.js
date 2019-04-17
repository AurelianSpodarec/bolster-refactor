import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditPinVersions from '../presentational/EditPinVersions';

class EditPinVersionsContainer extends Component {
    render() {
        const selectedVersion = this._getVersion();

        return <EditPinVersions selectedVersion={selectedVersion} />;
    }

    _getVersion = () => {
        const { versions, templateVersionID } = this.props;

        const selectedVersion = versions
            .filter(version => version.id === templateVersionID)
            .map(({ id }) => ({
                id: id
            }));

        return selectedVersion[0];
    };
}

const mapStateToProps = ({
    companyAdmin: {
        templateVersionsReducer: { versions }
    }
}) => ({
    versions: Object.values(versions)
});

export default connect(mapStateToProps)(EditPinVersionsContainer);
