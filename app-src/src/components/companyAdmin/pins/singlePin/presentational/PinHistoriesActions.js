import React from 'react';
import { Link } from 'react-router-dom';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const PinHistoriesActions = ({ location }) => (
    <BlockHeading title="Other pin histories">
        <button className="button red">
            <i className="fa fa-trash" />
            Delete all
        </button>

        <Link className="button" to={`${location.pathname}/add-history`}>
            <i className="fa fa-plus" />
            Add new history
        </Link>
    </BlockHeading>
);

export default PinHistoriesActions;
