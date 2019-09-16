import React, { Component } from 'react';

import RecentlyDeletedTable from '../presentational/RecentlyDeletedTable';

class RecentlyDeletedTableContainer extends Component {
    render() {
        return (
            <RecentlyDeletedTable
                headers={['Deleted item', 'Date deleted', '']}
                recentlyDeleted={[]}
            />
        );
    }
}

export default RecentlyDeletedTableContainer;
