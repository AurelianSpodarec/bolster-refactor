import React from 'react';
import { Link } from 'react-router-dom';

const StatsSiteDetails = ({ site }) => (
    <div className="size-lg-6">
        <p className="size-lg-12">
            {site.addressLine1}
            <br />
            {!!(site.addressLine2 && site.addressLine2.length) && (
                <>
                    {site.addressLine2} <br />
                </>
            )}
            {site.city}
            <br />
            {site.postCode}
        </p>
        <div className="button-container size-lg-12">
            <Link className="button" to="/edit">
                Edit
            </Link>{' '}
            <button className="button red">Delete Site</button>
        </div>
    </div>
);

export default StatsSiteDetails;
