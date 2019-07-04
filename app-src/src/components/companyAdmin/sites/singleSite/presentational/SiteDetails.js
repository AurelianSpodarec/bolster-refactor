import React from 'react';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const SiteDetails = ({
    site: { addressLine1, addressLine2, city, postcode, client },
    stats: { lastUpdatedOn }
}) => (
    <div className="size-lg-6 size-md-12">
        <h3 className="heading heading-3 size-lg-12">Client</h3>
        {!!client && <p className="size-lg-12">{client}</p>}

        <h3 className="heading heading-3 size-lg-12">Address</h3>

        {!!addressLine1 && <p className="size-lg-12">{addressLine1}</p>}
        {!!addressLine2 && <p className="size-lg-12">{addressLine2}</p>}
        {!!city && <p className="size-lg-12">{city}</p>}
        {!!postcode && <p className="size-lg-12">{postcode}</p>}

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

export default SiteDetails;
