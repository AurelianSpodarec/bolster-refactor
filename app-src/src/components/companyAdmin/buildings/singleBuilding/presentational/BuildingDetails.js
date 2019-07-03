import React from 'react';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const BuildingDetails = ({
    building: { location, name },
    stats: { lastUpdatedOn }
}) => (
    <div className="size-lg-6 size-md-12">
        <h3 className="heading heading-3 size-lg-12">Details</h3>
        {!!name && <p className="size-lg-12">{name}</p>}
        {!!location && <p className="size-lg-12">{location}</p>}
        {/* {!!postcode && <p className="size-lg-12">{postcode}</p>} */}
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

export default BuildingDetails;
