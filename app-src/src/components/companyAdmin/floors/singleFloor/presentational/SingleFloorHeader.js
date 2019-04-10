import React from 'react';
import { Link } from 'react-router-dom';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const SingleFloorHeader = ({ floor }) => (
    <PageHeading title={`Floor: ${floor.name || ''}`} />
);

export default SingleFloorHeader;
