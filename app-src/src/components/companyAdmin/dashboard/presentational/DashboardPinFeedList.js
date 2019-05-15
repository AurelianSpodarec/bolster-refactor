import React from 'react';

import DashboardPinFeedItem from './DashboardPinFeedItem';

const DashboardPinFeedList = ({ pins }) =>
    console.log(pins) ||
    [...pins]
        .sort((a, b) => b.syncedOn - a.syncedOn)
        .map(pin => <DashboardPinFeedItem key={pin.createdOn} pin={pin} />);

export default DashboardPinFeedList;
