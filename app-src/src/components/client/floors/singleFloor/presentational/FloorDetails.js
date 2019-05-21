import React from 'react';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const FloorDetails = ({ stats: { lastUpdatedOn } }) => (
    <div className="size-lg-6">
        <h3 className="heading heading-3 size-lg-12">Last Updated</h3>

        {lastUpdatedOn ? (
            <p className="size-lg-12">
                <DateTimeContainer date={lastUpdatedOn} />
            </p>
        ) : (
            <p className="size-lg-12">Not Updated</p>
        )}
    </div>
);

export default FloorDetails;
