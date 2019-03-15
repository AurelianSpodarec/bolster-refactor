import React from 'react';
import { Link } from 'react-router-dom';

const StatsSiteDetails = ({ details }) => (
    <div className="size-lg-6">
        <p className="size-lg-12">
            {details.addressLine1}
            <br />
            {details.addressLine2}
            <br />
            {details.city}
            <br />
            {details.postCode}
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
