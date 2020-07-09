import React from 'react';
import { Link } from 'react-router-dom';

const ClientAccessBanner = () => (
    <div className="client-access-banner">
        <p className="banner-text">
            You are currently viewing the Free Client Access version of Bolster Systems. If you
            would like to see the full version's key features and benefits please submit a demo
            request and a member of the Bolster Systems team will get back to you.
            <span className="demo-link">
                <Link to="/Request">Request a demo here</Link>
            </span>
        </p>
    </div>
);

export default ClientAccessBanner;
