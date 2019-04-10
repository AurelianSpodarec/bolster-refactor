import React from 'react';
import moment from 'moment';

const FloorDetails = ({ stats: { lastUpdatedOn } }) => (
    <div className="size-lg-6">
        <h3 className="heading heading-3 size-lg-12">Last Updated</h3>

        {lastUpdatedOn ? (
            <p className="size-lg-12">
                {moment(lastUpdatedOn).format('DD/MM/YYYY hh:mm a')}
            </p>
        ) : (
            <p className="size-lg-12">Not Updated</p>
        )}
    </div>
);

export default FloorDetails;
