import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import AllCompanyAdminsTable from '../presentational/AllCompanyAdminsTable';
import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import { CREATE_COMPANY_ADMIN } from 'constants/shared/modalTypes';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty, nameSort } from 'helpers/generic';

class AllCompanyAdminTableContainer extends Component {
    render() {
        const { isFetching, error, users } = this.props;

        return (
            <BlockContainer
                isFetching={isFetching}
                error={error}
                isEmpty={isEmpty(users)}
            >
                <AllCompanyAdminsTable
                    headers={[
                        'Name',
                        'Email',
                        'Phone Number',
                        'Has linked device?',
                        'Operative Code',
                        ''
                    ]}
                    users={this._filterUsersForAdmins()}
                    isFetching={isFetching}
                    error={error}
                    handleCreateCompanyAdmin={this.handleCreateCompanyAdmin}
                />
            </BlockContainer>
        );
    }

    _filterUsersForAdmins = () => {
        const { users } = this.props;

        const ret = users.filter(
            user => user.type >= COMPANY_USER_ROLE_TYPES.ADMIN
        );

        return ret.sort(nameSort);
    };

    handleCreateCompanyAdmin = () => {
        this.props.showModal(CREATE_COMPANY_ADMIN);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        companyUsersReducer: { users, isFetching, error, postSuccess }
    }
}) => ({
    isFetching,
    error,
    postSuccess,
    users: Object.values(users) || []
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
