import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddCreditsToDrawingButton from '../presentational/AddCreditsToDrawingButton';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { ADD_CREDITS_TO_DRAWING } from 'constants/shared/modalTypes';

class AddCreditsToDrawingButtonContainer extends Component {
    render() {
        return <AddCreditsToDrawingButton handleClick={this.handleClick} />;
    }

    handleClick = () => {
        this.props.showModal(ADD_CREDITS_TO_DRAWING, {
            drawing: this.props.drawing
        });
    };
}

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props))
});

export default connect(
    null,
    mapDispatchToProps
)(AddCreditsToDrawingButtonContainer);
