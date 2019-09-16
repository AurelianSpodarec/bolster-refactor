import React from 'react';

import RecentlyDeletedListItemContainer from '../containers/RecentlyDeletedListItemContainer';

const RecentlyDeletedList = ({ recentlyDeleted, colCount, headers }) => {
    return recentlyDeleted.map(item => (
        <RecentlyDeletedListItemContainer
            key={item.id}
            item={item}
            colCount={colCount}
            headers={headers}
        />
    ));
};
export default RecentlyDeletedList;
