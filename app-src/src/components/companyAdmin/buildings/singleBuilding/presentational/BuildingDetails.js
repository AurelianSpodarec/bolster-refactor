import React from 'react';
import moment from 'moment';

const BuildingDetails = ({
    building: { addressLine1, addressLine2, city, postcode },
    stats: { lastUpdatedOn }
}) => (
    <div className="size-lg-6">
        <h3 className="heading heading-3 size-lg-12">Address</h3>

        {!!addressLine1 && <p className="size-lg-12">{addressLine1}</p>}
        {!!addressLine2 && <p className="size-lg-12">{addressLine2}</p>}
        {!!city && <p className="size-lg-12">{city}</p>}
        {!!postcode && <p className="size-lg-12">{postcode}</p>}
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

export default BuildingDetails;
