import React from 'react';
import { connect } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import editCompanyUserType from 'actions/companyAdmin/userManagement/async/editCompanyUserType';
import UserDrawingListItem from '../presentational/UserDrawingListItem';

const UserDrawingListItemContainer = ({
    drawing,
    colCount,
    checkedDrawings,
    handleDrawingIDs
}) => {
    return (
        <UserDrawingListItem
            drawing={drawing}
            colCount={colCount}
            checkedDrawings={checkedDrawings}
            handleDrawingIDs={handleDrawingIDs}
        />
    );
};

const mapDispatchToProps = { showModal, hideModal, editCompanyUserType };

export default connect(
    null,
    mapDispatchToProps
)(UserDrawingListItemContainer);
