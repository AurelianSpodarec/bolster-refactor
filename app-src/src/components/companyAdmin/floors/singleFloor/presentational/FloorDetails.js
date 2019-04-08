import React from 'react';
import { Link } from 'react-router-dom';

const FloorDetails = ({ floor }) => (
    <div className="size-lg-6">
        <div className="button-container size-lg-12">
            <Link
                className="button yellow"
                to={`/company/floors/${floor.id}/edit`}
            >
                <i className="far fa-pencil" /> Edit floor
            </Link>
        </div>
    </div>
);

export default FloorDetails;
