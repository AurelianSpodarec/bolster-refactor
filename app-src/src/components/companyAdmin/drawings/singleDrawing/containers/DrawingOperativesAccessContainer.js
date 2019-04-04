import React, { Component } from 'react';
import { connect } from 'react-redux';

import OperativesTable from 'components/shared/operatives/presentational/OperativesTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { DELETION_ERROR, DELETE_OPERATIVE } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

class DrawingOperativesAccessContainer extends Component {
    render() {
        const { operatives } = this.props;

        return (
            <BlockContainer>
                <OperativesTable
                    operatives={operatives}
                    handleShowModal={this.handleShowModal}
                />
            </BlockContainer>
        );
    }

    componentDidUpdate(prevProps) {
        const { deletionError, showModal } = this.props;
        if (deletionError && !prevProps.deletionError) {
            showModal(DELETION_ERROR, {
                title: 'Deletion Error:',
                message:
                    'An error occurred while removing this operative, please try again later'
            });
        }
    }

    handleShowModal = operative => {
        const { showModal } = this.props;
        showModal(DELETE_OPERATIVE, { operative });
    };
}

const mapStateToProps = ({ companyAdmin: { operativesReducer } }) => ({
    operatives: Object.values(operativesReducer.operatives),
    isFetching: operativesReducer.isFetching,
    error: operativesReducer.error,
    deletionError: operativesReducer.deletionError
});

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) => {
        dispatch(showModal(modalType, modalProps));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawingOperativesAccessContainer);
