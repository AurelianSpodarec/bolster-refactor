import React, { Component } from 'react';
import { connect } from 'react-redux';

import SetLabelFieldModal from '../presentational/SetLabelFieldModal';

class SetLabelFieldModalContainer extends Component {
    render() {
        const { hideModal, template } = this.props;
        return (
            <SetLabelFieldModal
                labelType={template.labelType}
                hideModal={hideModal}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    handleSubmit = () => {
        console.log('submitting...');
    };
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SetLabelFieldModalContainer);
