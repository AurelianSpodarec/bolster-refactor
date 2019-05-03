import React from 'react';
import { connect } from 'react-redux';

import DropdownOptionsListItem from '../presentational/DropdownOptionsListItem';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

const DropdownOptionsListItemContainer = ({ option, colCount, showModal }) => (
    <DropdownOptionsListItem
        option={option}
        colCount={colCount}
        showModal={showModal}
    />
);

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props))
});

export default connect(
    null,
    mapDispatchToProps
)(DropdownOptionsListItemContainer);
