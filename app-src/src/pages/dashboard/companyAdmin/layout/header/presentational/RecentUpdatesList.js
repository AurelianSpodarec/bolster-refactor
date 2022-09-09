import React from 'react';
import { isEmpty } from 'helpers/generic';
import Loading from 'components/shared/generic/misc/presentational/Loading';

const RecentUpdatesList = ({ isFetching, error, updates, handleOpenUpdate }) => {
    if (error) return <p className="info">There was an error retrieving the data.</p>;

    if (isFetching && isEmpty(updates)) return <Loading />;

    if (isEmpty(updates)) return <p className="info">There are no updates.</p>;

    return updates.map(update => (
        <a key={update.id} className="item" onClick={() => handleOpenUpdate(update)}>
            <h2>{update.title}</h2>
            <p>{update.shortDescription}</p>
        </a>
    ));
};

export default RecentUpdatesList;
