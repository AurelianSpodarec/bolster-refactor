import React from 'react';
import { Link } from 'react-router-dom';

const FloorDetails = ({ floor }) => (
    <div className="size-lg-6">
        <p className="size-lg-12">##details##</p>

        <div className="button-container size-lg-12">
            <Link className="button" to={`/floors/${floor.id}/edit`}>
                Edit
            </Link>{' '}
            <button className="button red">Delete Floor</button>
        </div>
    </div>
);

export default FloorDetails;
