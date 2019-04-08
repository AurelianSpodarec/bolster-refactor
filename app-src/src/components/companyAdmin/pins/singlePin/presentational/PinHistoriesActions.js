import React from 'react';
import { Link } from 'react-router-dom';

import BlockHeadingWControls from 'components/shared/generic/blockHeadingWControls/presentational/BlockHeadingWControls';

const PinHistoriesActions = ({ location }) => (
    <BlockHeadingWControls title="Other pin histories">
        <button className="button red">
            <i className="fa fa-trash" />
            Delete all
        </button>

        <Link className="button" to={`${location.pathname}/add-history`}>
            <i className="fa fa-plus" />
            Add new history
        </Link>
    </BlockHeadingWControls>
);

export default PinHistoriesActions;
