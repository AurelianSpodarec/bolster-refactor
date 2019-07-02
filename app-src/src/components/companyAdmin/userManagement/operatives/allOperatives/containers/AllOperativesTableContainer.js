import React, { Component } from 'react';
import { connect } from 'react-redux';

import AllOperativesTable from '../presentational/AllOperativesTable';
import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { CREATE_OPERATIVE } from 'constants/shared/modalTypes';
import { nameSort } from 'helpers/generic';
const { OPERATIVE } = COMPANY_USER_ROLE_TYPES;

class AllOperativesTableContainer extends Component {
    render = () => {
        const { users, isFetching, error } = this.props;

        const sortedUsers = users.sort(nameSort);
        return (
            <AllOperativesTable
                headers={[
                    'Name',
                    'Email',
                    'Phone Number',
                    'Has linked device?',
                    'Operative Code',
                    ''
                ]}
                users={sortedUsers}
                isFetching={isFetching}
                error={error}
                handleShowModal={this.handleShowModal}
            />
        );
    };

    componentDidMount = () => this.props.fetchCompanyUsers();

    componentDidUpdate = prevProps => {
        const { postSuccess, hideModal, fetchCompanyUsers } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            fetchCompanyUsers();
            hideModal();
        }
    };
    handleShowModal = () => this.props.showModal(CREATE_OPERATIVE);
}

const mapStateToProps = ({
    companyAdmin: {
        companyUsersReducer: { isFetching, error, users, postSuccess }
    }
}) => ({
    users: Object.values(users).filter(({ type }) => type === OPERATIVE),
    isFetching,
    error,
    postSuccess
});

const mapDispatchToProps = { fetchCompanyUsers, hideModal, showModal };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllOperativesTableContainer);
