import React from 'react';
import { Link } from 'react-router-dom';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const BuildingPageHeader = ({ building }) => (
    <PageHeading title={`Building: ${building.name}`}>
        <Link className="button" to={`/buildings/create/${building.id}`}>
            <i className="far fa-plus" /> Add floor
        </Link>
        <Link className="button" to="/site">
            <i className="fa fa-exchange" /> Change Ownership
        </Link>
    </PageHeading>
);

export default BuildingPageHeader;
