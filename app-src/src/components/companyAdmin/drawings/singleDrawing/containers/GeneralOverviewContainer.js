import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import GeneralOverview from '../presentational/GeneralOverview';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import {
    CONFIRM_DELETE,
    ERROR_MODAL,
    CONFIRM_ARCHIVE,
    SUCCESS_MODAL
} from 'constants/shared/modalTypes';
import deleteDrawing from 'actions/companyAdmin/drawings/async/deleteDrawing';
import archiveDrawing from 'actions/companyAdmin/drawings/async/archiveDrawing';
import { isObjEmpty } from 'helpers/generic';

class GeneralOverviewContainer extends Component {
    render = () => (
        <GeneralOverview
            handleDelete={this.handleDeleteModal}
            handleArchive={this.handleArchiveModal}
            drawing={this.props.drawing}
        />
    );

    componentDidUpdate = prevProps => {
        const {
            deleteSuccess,
            postFailure,
            history,
            showModal,
            hideModal,
            drawing
        } = this.props;
        if (deleteSuccess && !prevProps.deleteSuccess) {
            hideModal();
            history.push(`/company/floors/${drawing.floorID}`);
        }
        if (postFailure && !prevProps.postFailure) showModal(ERROR_MODAL);

        if (
            drawing.isArchived !== prevProps.drawing.isArchived &&
            !isObjEmpty(prevProps.drawing)
        ) {
            showModal(SUCCESS_MODAL, {
                title: 'Archive success',
                message: `Drawing successfully ${
                    !drawing.isArchived ? 'un' : ''
                }archived.`
            });
        }
    };

    handleDeleteModal = () => {
        const { id, showModal, hideModal, deleteDrawing, drawing } = this.props;
        const handleDelete = () => deleteDrawing(id);
        const message = `Are you sure you want to delete ${drawing.name}`;
        showModal(CONFIRM_DELETE, {
            hideModal,
            handleDelete,
            message,
            isIncoming: false
        });
    };

    handleArchiveModal = () => {
        const {
            id,
            showModal,
            hideModal,
            drawing,
            archiveDrawing
        } = this.props;
        const handleArchive = () => {
            archiveDrawing(id, drawing.isArchived);
            hideModal();
        };
        const message = `Are you sure you want to ${
            drawing.isArchived ? 'un-' : ''
        }archive ${drawing.name}?`;
        showModal(CONFIRM_ARCHIVE, {
            hideModal,
            handleArchive,
            message,
            archive: !drawing.isArchived
        });
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            drawingsReducer: { deleteSuccess, postFailure, drawings }
        }
    },
    { match: { params } }
) => ({
    drawing: drawings[params.id] || {},
    deleteSuccess,
    postFailure,
    id: params.id
});

const mapDispatchToProps = {
    hideModal,
    showModal,
    deleteDrawing,
    archiveDrawing
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(GeneralOverviewContainer)
);
