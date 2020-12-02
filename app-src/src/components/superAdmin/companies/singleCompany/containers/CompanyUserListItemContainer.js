import React from 'react';
import { connect } from 'react-redux';

import CompanyUserListItem from '../presentational/CompanyUserListItem';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { ADMIN_LATEST_SYNCS } from 'constants/shared/modalTypes';

const CompanyUserListItemContainer = ({ user, showModal }) => {
    const handleModalClick = () => {
        showModal(ADMIN_LATEST_SYNCS, { id: user.id });
    };
    return <CompanyUserListItem user={user} handleModalClick={handleModalClick} />;
};

const mapDispatchToProps = { showModal };

export default connect(null, mapDispatchToProps)(CompanyUserListItemContainer);
