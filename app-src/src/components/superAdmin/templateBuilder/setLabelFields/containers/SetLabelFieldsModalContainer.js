import React, { Component } from 'react';
import { connect } from 'react-redux';

import SetLabelFieldModal from '../presentational/StaticLabelField';

class SetLabelFieldModalContainer extends Component {
    render() {
        const { hideModal } = this.props;
        return (
            <SetLabelFieldModal
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
