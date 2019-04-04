import React from 'react';
import { connect } from 'react-redux';

import AllCompanyAdminsListItem from '../presentational/AllCompanyAdminsListItem';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { DELETE_COMPANY_USER } from 'constants/shared/modalTypes';

const AllCompanyAdminsListItemContainer = ({
    user,
    colCount,
    showDeleteModal,
    showModal
}) => (
    <AllCompanyAdminsListItem
        user={user}
        colCount={colCount}
        showDeleteModal={() => showModal(DELETE_COMPANY_USER, { id: user.id })}
    />
);

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props))
});

export default connect(
    null,
    mapDispatchToProps
)(AllCompanyAdminsListItemContainer);
