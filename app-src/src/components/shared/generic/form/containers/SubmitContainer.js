import React, { Component } from 'react';
import { connect } from 'react-redux';

import Submit from '../presentational/Submit';

class SubmitContainer extends Component {
    render() {
        const { withPlus, filesUploading, text } = this.props;
        return (
            <Submit
                withPlus={withPlus}
                text={text}
                filesUploading={filesUploading}
            />
        );
    }
}

const mapStateToProps = ({
    shared: {
        filesUploadingReducer: { filesUploading }
    }
}) => ({
    filesUploading
});

export default connect(mapStateToProps)(SubmitContainer);
