import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import RecentlyDeletedListItem from '../presentational/RecentlyDeletedListItem';

class RecentlyDeletedListItemContainer extends Component {
    render() {
        const { item, colCount, onMobile, headers } = this.props;

        return (
            <RecentlyDeletedListItem
                item={item}
                colCount={colCount}
                onMobile={onMobile}
                headers={headers}
            />
        );
    }
}

export default withRouter(connect()(RecentlyDeletedListItemContainer));
