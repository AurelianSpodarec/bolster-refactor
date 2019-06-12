import React from 'react';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const BuildingDetails = ({
    building: { addressLine1, addressLine2, city, postcode },
    stats: { lastUpdatedOn }
}) => (
    <div className="size-lg-12">
        <div className="size-lg-6">
            <h3 className="heading heading-3 size-lg-12">Address</h3>

            {!!addressLine1 && <p className="size-lg-12">{addressLine1}</p>}
            {!!addressLine2 && <p className="size-lg-12">{addressLine2}</p>}
            {!!city && <p className="size-lg-12">{city}</p>}
            {!!postcode && <p className="size-lg-12">{postcode}</p>}
        </div>
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
    </div>
);

export default BuildingDetails;
