import React from 'react';
import { Link } from 'react-router-dom';

const Building = () => (
    <div className="content-container size-lg-12">
        <div className="content-area size-lg-12">
            <h1>Building</h1>
        </div>
        <Link className="button" to="/sites/1/building/1/floor/1">
            View Floor
        </Link>
    </div>
);

export default Building;
