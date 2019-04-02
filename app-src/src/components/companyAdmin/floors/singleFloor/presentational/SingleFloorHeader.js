import React from 'react';
import { Link } from 'react-router-dom';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const SingleFloorHeader = ({ floor }) => (
    <PageHeading title={`Floor: ${floor.name || ''}`}>
        <Link className="button" to={`/drawings/create/${floor.id}`}>
            <i className="far fa-plus" /> Add drawing
        </Link>
        <Link className="button" to="/floor">
            <i className="fa fa-exchange" /> Change Ownership
        </Link>
        <Link className="button yellow" to={`/floors/edit/${floor.id}`}>
            <i className="far fa-pencil" /> Edit Floor
        </Link>
    </PageHeading>
);

export default SingleFloorHeader;
