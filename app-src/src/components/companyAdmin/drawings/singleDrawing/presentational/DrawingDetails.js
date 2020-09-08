import React from 'react';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const DrawingDetails = ({ stats: { lastUpdatedOn, lastUpdatedByName } }) => (
    <p className="size-lg-12">
        Last Updated:{' '}
        {lastUpdatedOn ? (
            <>
                <span>
                    <DateTimeContainer date={lastUpdatedOn} />
                </span>{' '}
                <span>{`${lastUpdatedByName}`}</span>
            </>
        ) : (
            <span>Not Updated</span>
        )}
    </p>
);

export default DrawingDetails;
