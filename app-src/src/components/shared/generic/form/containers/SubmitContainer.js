import React, { Component } from 'react';
import { connect } from 'react-redux';

import Submit from '../presentational/Submit';

class SubmitContainer extends Component {
    render() {
        const { filesUploading, text, icon } = this.props;
        return <Submit icon={icon} text={text} filesUploading={filesUploading} />;
    }
}

const mapStateToProps = ({
    shared: {
        filesUploadingReducer: { filesUploading },
    },
}) => ({
    filesUploading,
});

export default connect(mapStateToProps)(SubmitContainer);
