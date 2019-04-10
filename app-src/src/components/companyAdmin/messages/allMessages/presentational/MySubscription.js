import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const MySubscription = ({ services, daysleft, location }) => (
    <div className="size-lg-12">
        <h1 className="heading heading-3 size-lg-12">My Subscription</h1>

        <p className="generic-text size-lg-12">
            {`Expire in ${daysleft} days`}
        </p>

        {services.map(service => (
            <p key={service.value}>{service.text}</p>
        ))}

        <div className="button-container">
            <Link
                className="button pull-right"
                to={`${location.pathname}/invite-client`}
            >
                <i className="fa fa-plus" /> Invite
            </Link>
        </div>
    </div>
);

export default withRouter(MySubscription);
