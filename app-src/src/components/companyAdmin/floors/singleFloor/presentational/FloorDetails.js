import React from 'react';
import { Link } from 'react-router-dom';

const FloorDetails = ({ floor }) => (
    <div className="size-lg-6">
        <p className="size-lg-12">##details##</p>

        <div className="button-container size-lg-12">
            <Link className="button yellow" to={`/floors/${floor.id}/edit`}>
                <i className="far fa-pencil" /> Edit Floor
            </Link>
        </div>
    </div>
);

export default FloorDetails;
