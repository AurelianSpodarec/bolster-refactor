import React from 'react';

import NewFeaturesTable from '../presentational/NewFeaturesTable';

export default function NewFeaturesTableContainer({ isFetching, error, recentUpdates }) {
    console.log(recentUpdates);
    return <NewFeaturesTable />;
}
