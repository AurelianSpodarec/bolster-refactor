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
    state={searchTerm:''}
    render = () => {
        const { users, isFetching, error, onMobile } = this.props;
        const searchTerm = this.state.searchTerm.toLowerCase();
        const filteredUsers = users.filter(user => {
            const name = `${user.userFirstName} ${user.userLastName}`.toLowerCase();
            return !searchTerm || name.includes(searchTerm) || user.userEmail.includes(searchTerm);
        });
        const sortedUsers = filteredUsers.sort(nameSort);
        return (
            <AllOperativesTable
            searchTerm={searchTerm}
            handleChange={this.handleChange}
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
                onMobile={onMobile}
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

    handleChange = (name, value) => this.setState({[name]:value})
}

const mapStateToProps = ({
    companyAdmin: {
        companyUsersReducer: { isFetching, error, users, postSuccess }
    },
    shared: {
        mobileReducer: { onMobile }
    }
}) => ({
    users: Object.values(users).filter(({ type }) => type === OPERATIVE),
    isFetching,
    error,
    onMobile,
    postSuccess
});

const mapDispatchToProps = { fetchCompanyUsers, hideModal, showModal };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllOperativesTableContainer);
