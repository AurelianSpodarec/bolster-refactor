import React from 'react';

import RecentlyDeletedListItemContainer from '../containers/RecentlyDeletedListItemContainer';

const RecentlyDeletedList = ({ recentlyDeleted, colCount, headers }) => {
    return recentlyDeleted
        .sort((a, b) => {
            if (!b.deletedOn) return -1;
            return b.deletedOn - a.deletedOn;
        })
        .map(item => (
            <RecentlyDeletedListItemContainer
                key={`${item.id}_${item.name}`}
                item={item}
                colCount={colCount}
                headers={headers}
            />
        ));
};
export default RecentlyDeletedList;
