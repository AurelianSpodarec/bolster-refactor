import React from 'react';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const DrawingDetails = ({ stats: { lastUpdatedOn, lastUpdatedByName } }) => (
    <p className="size-lg-12">
        Last Updated By:{' '}
        {lastUpdatedOn ? (
            <>
                <span>{`${lastUpdatedByName}`}</span>{' '}
                <span>
                    <DateTimeContainer date={lastUpdatedOn} />
                </span>
            </>
        ) : (
            <span>Not Updated</span>
        )}
    </p>
);

export default DrawingDetails;
