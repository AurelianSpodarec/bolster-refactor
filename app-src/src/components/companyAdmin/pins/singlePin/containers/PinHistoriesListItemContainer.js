import React from 'react';
import { connect } from 'react-redux';

import selectPinHistory from 'actions/companyAdmin/pins/sync/selectPinHistory';
import PinHistoriesListItem from '../presentational/PinHistoriesListItem';

const PinHistoriesListItemContainer = ({ dispatch, ...otherProps }) => (
    <PinHistoriesListItem
        {...otherProps}
        selectHistory={e => {
            e.preventDefault();
            dispatch(selectPinHistory(otherProps.history.id));
        }}
    />
);

export default connect()(PinHistoriesListItemContainer);
