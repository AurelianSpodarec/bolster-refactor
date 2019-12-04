import React, { Component } from 'react';
import { connect } from 'react-redux';

import OperativesTable from 'components/shared/operatives/presentational/OperativesTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import { ERROR_MODAL, DELETE_OPERATIVE } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { isEmpty } from 'helpers/generic';

class DrawingOperativesAccessContainer extends Component {
    render() {
        const { operatives, isFetching, error, users } = this.props;
        const operativesWithCodes = operatives.map(operative => {
            const user = users.find(({ id }) => id === operative.companyUserID) || {};
            const canEditUser = !isEmpty(user);

            return {
                ...operative,
                canEditUser,
            };
        });

        return (
            <BlockContainer containerClass="always-scrollbar">
                <OperativesTable
                    operatives={operativesWithCodes}
                    handleDeleteOperativeModal={this.handleDeleteOperativeModal}
                    isAddOperativeDisabled={this.checkAvailableOperatives()}
                    isFetching={isFetching}
                    error={error}
                    smallList={true}
                />
            </BlockContainer>
        );
    }

    componentDidUpdate(prevProps) {
        const { deletionError, showModal } = this.props;
        if (deletionError && !prevProps.deletionError) {
            showModal(ERROR_MODAL, {
                title: 'Deletion Error:',
                message: 'An error occurred while removing this operative, please try again later',
            });
        }
    }

    checkAvailableOperatives = () => {
        const { operatives, users } = this.props;
        return operatives.length === users.length;
    };

    handleDeleteOperativeModal = operative => {
        const { showModal } = this.props;
        showModal(DELETE_OPERATIVE, { operative });
    };
}

const mapStateToProps = ({ companyAdmin: { operativesReducer, companyUsersReducer } }) => ({
    operatives: Object.values(operativesReducer.operatives),
    isFetching: operativesReducer.isFetching,
    users: Object.values(companyUsersReducer.users),
    error: operativesReducer.error,
    deletionError: operativesReducer.deletionError,
});

const mapDispatchToProps = { showModal };

export default connect(mapStateToProps, mapDispatchToProps)(DrawingOperativesAccessContainer);
