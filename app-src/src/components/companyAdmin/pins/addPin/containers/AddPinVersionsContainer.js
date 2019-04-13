import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddPinVersions from '../presentational/AddPinVersions';

class AddPinVersionsContainer extends Component {
    render() {
        const selectedVersion = this._getVersion();

        return <AddPinVersions selectedVersion={selectedVersion} />;
    }

    _getVersion = () => {
        const { selectedTemplateID, versions } = this.props;

        const selectedVersion = versions
            .filter(version => version.templateID === selectedTemplateID)
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

export default connect(mapStateToProps)(AddPinVersionsContainer);
