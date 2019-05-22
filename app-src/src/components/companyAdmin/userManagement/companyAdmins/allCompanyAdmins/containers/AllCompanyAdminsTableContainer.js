import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import AllCompanyAdminsTable from '../presentational/AllCompanyAdminsTable';
import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import {
    CREATE_COMPANY_ADMIN,
    EDIT_COMPANY_ADMIN,
    COMPANY_ADMIN_CHANGE_PASSWORD,
    ERROR_MODAL,
    SUCCESS_MODAL
} from 'constants/shared/modalTypes';

class AllCompanyAdminTableContainer extends Component {
    render() {
        const { isFetching, error } = this.props;

        return (
            <AllCompanyAdminsTable
                headers={['Name', 'Email', 'Phone Number', '']}
                users={this._filterUsersForAdmins()}
                isFetching={isFetching}
                error={error}
                handleCreateCompanyAdmin={this.handleCreateCompanyAdmin}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, showModal, hideModal, error } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            showModal(SUCCESS_MODAL, {
                hideModal,
                message: 'Company Admin added successfully.'
            });
        }

        if (error && !prevProps.error) {
            showModal(ERROR_MODAL, {
                hideModal,
                title: 'Error',
                message:
                    error.message ||
                    'There was an error processing your request, please try again later.'
            });
        }
    };
    _filterUsersForAdmins = () => {
        const { users } = this.props;

        const ret = users.filter(
            user => user.type >= COMPANY_USER_ROLE_TYPES.ADMIN
        );

        return ret;
    };

    handleCreateCompanyAdmin = () => {
        this.props.showModal(CREATE_COMPANY_ADMIN);
    };
}

const mapStateToProps = ({ companyAdmin: { companyUsersReducer } }) => ({
    users: Object.values(companyUsersReducer.users) || [],
    isFetching: companyUsersReducer.isFetching,
    error: companyUsersReducer.error
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => {
        dispatch(showModal(type, props));
    },
    hideModal: () => {
        dispatch(hideModal());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllCompanyAdminTableContainer);
