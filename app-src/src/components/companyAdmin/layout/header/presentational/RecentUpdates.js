import React from 'react';
import RecentUpdatesList from './RecentUpdatesList';

const RecentUpdates = ({
    node,
    listVisible,
    toggleListVisibility,
    isFetching,
    error,
    updates,
    handleOpenUpdate,
}) => (
    <div className="recent-updates" ref={node}>
        <button className="icon" type="button" onClick={toggleListVisibility}>
            <i className="fas fa-bullhorn"></i>
        </button>

        <div className={`list ${listVisible ? 'visible' : ''}`}>
            <RecentUpdatesList
                isFetching={isFetching}
                error={error}
                updates={updates}
                handleOpenUpdate={handleOpenUpdate}
            />
        </div>
    </div>
);

export default RecentUpdates;
