import React from 'react';
import { Link } from 'react-router-dom';

const SiteDetails = ({
    site: { addressLine1, addressLine2, city, postcode }
}) => (
    <div className="size-lg-6">
        {!!addressLine1 && <p className="size-lg-12">{addressLine1}</p>}
        {!!addressLine2 && <p className="size-lg-12">{addressLine2}</p>}
        {!!city && <p className="size-lg-12">{city}</p>}
        {!!postcode && <p className="size-lg-12">{postcode}</p>}

        <div className="button-container size-lg-12">
            <Link className="button" to="/edit">
                Edit
            </Link>{' '}
            <button className="button red">Delete Site</button>
        </div>
    </div>
);

export default SiteDetails;
