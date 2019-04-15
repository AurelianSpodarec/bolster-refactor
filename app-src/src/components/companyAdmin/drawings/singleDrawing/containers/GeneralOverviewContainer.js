import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import GeneralOverview from '../presentational/GeneralOverview';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { CONFIRM_DELETE, ERROR_MODAL } from 'constants/shared/modalTypes';
import deleteDrawing from 'actions/companyAdmin/drawings/async/deleteDrawing';

class GeneralOverviewContainer extends Component {
    render = () => <GeneralOverview handleDelete={this.handleDeleteModal} />;

    componentDidUpdate = prevProps => {
        const {
            postSuccess,
            postFailure,
            history,
            showModal,
            hideModal,
            drawing
        } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            hideModal();
            history.push(`/company/floors/${drawing.floorID}`);
        }
        if (postFailure && !prevProps.postFailure) showModal(ERROR_MODAL);
    };

    handleDeleteModal = () => {
        const { id, showModal, hideModal, deleteDrawing, drawing } = this.props;
        const handleDelete = () => deleteDrawing(id);
        const message = `Are you sure you want to delete ${drawing.name}`;
        showModal(CONFIRM_DELETE, { hideModal, handleDelete, message });
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            drawingsReducer: { postSuccess, postFailure, drawings }
        }
    },
    { match }
) => ({
    drawing: drawings[match.params.id],
    postSuccess,
    postFailure,
    id: match.params.id
});

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch(hideModal()),
    showModal: (type, props) => dispatch(showModal(type, props)),
    deleteDrawing: id => dispatch(deleteDrawing(id))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(GeneralOverviewContainer)
);
