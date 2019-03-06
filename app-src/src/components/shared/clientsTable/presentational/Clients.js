import React from 'react';
import { Link } from 'react-router-dom';

const name = () => (
    <div className="size-lg-12">
        <h2 className="heading heading-3 size-lg-12">Clients with access</h2>
        <Link to="" className="button">
            <i className="fal fa-plus" /> Invite client
        </Link>
    </div>
);

export default name;
