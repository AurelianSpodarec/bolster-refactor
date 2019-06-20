import React, { Component } from 'react';
import { connect } from 'react-redux';

import RecordPaymentModal from '../presentational/RecordPaymentModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
// import { showModal } from 'actions/shared/generic/modals/sync/showModal';

class RecordPaymentModalContainer extends Component {
    render() {
        const { hideModal } = this.props;
        return (
            <RecordPaymentModal
                // handleSubmit={this.handleSubmit}
                hideModal={e => {
                    e.preventDefault();
                    hideModal();
                }}
            />
        );
    }
}

const mapDispatchToProps = {
    hideModal
};

export default connect(
    null,
    mapDispatchToProps
)(RecordPaymentModalContainer);
