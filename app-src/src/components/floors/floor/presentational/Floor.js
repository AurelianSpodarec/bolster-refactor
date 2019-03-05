import React from 'react';
import { Link } from 'react-router-dom';

const Floor = () => (
    <div className="content-container size-lg-12">
        <div className="content-area size-lg-12">
            <h1>Floor</h1>
        </div>
        <Link className="button" to="/sites/1/building/1/floor/1/drawing/1">
            View Drawing
        </Link>
    </div>
);

export default Floor;
