import React, { Component } from 'react';
import { connect } from 'react-redux';

import OperativesTable from 'components/shared/operatives/presentational/OperativesTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import { ERROR_MODAL, DELETE_OPERATIVE } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

class DrawingOperativesAccessContainer extends Component {
    render() {
        const { operatives, isFetching, error } = this.props;

        return (
            <BlockContainer>
                <OperativesTable
                    operatives={operatives}
                    handleDeleteOperativeModal={this.handleDeleteOperativeModal}
                    isAddOperativeDisabled={this.checkAvailableOperatives()}
                    isFetching={isFetching}
                    error={error}
                />
            </BlockContainer>
        );
    }

    componentDidUpdate(prevProps) {
        const { deletionError, showModal } = this.props;
        if (deletionError && !prevProps.deletionError) {
            showModal(ERROR_MODAL, {
                title: 'Deletion Error:',
                message:
                    'An error occurred while removing this operative, please try again later'
            });
        }
    }

    checkAvailableOperatives = () => {
        const { operatives, users } = this.props;
        const availableOperatives = users.filter(
            user => user.type === COMPANY_USER_ROLE_TYPES.OPERATIVE
        );
        return operatives.length === availableOperatives.length;
    };

    handleDeleteOperativeModal = operative => {
        const { showModal } = this.props;
        showModal(DELETE_OPERATIVE, { operative });
    };
}

const mapStateToProps = ({
    companyAdmin: { operativesReducer, companyUsersReducer }
}) => ({
    operatives: Object.values(operativesReducer.operatives),
    isFetching: operativesReducer.isFetching,
    users: Object.values(companyUsersReducer.users),
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
