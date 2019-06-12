import React from 'react';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const DrawingDetails = ({ stats: { lastUpdatedOn } }) => (
    <p style={{ height: '100%' }} className="size-lg-12">
        Last Updated:{' '}
        {lastUpdatedOn ? (
            <span>
                <DateTimeContainer date={lastUpdatedOn} />
            </span>
        ) : (
            <span>Not Updated</span>
        )}
    </p>
);

export default DrawingDetails;
