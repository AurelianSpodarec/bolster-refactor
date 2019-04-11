import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const MySubscription = ({ services, daysleft }) => (
    <div className="size-lg-12">
        <h1 className="heading heading-3 size-lg-12">My Subscription</h1>

        <p className="generic-text size-lg-12">
            {daysleft > 1
                ? `Expires in ${daysleft} days.`
                : daysleft
                ? `Expires in ${daysleft} day.`
                : 'Expired'}
        </p>

        {services.map(service => (
            <p key={service.value}>{service.text}</p>
        ))}

        <div className="button-container">
            <Link className="button pull-right" to="/company/subscription">
                Manage My Subscription
            </Link>
        </div>
    </div>
);

export default withRouter(MySubscription);
