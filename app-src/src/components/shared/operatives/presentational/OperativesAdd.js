import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const OperativesAdd = ({ type, location }) => (
    <div className="size-lg-12">
        <BlockHeading title="Invite Operative">
            <Link
                className="button pull-right"
                to={`${location.pathname}/add-operative`}
            >
                <i className="fa fa-plus" /> Invite
            </Link>
        </BlockHeading>
        <p className="generic-text size-lg-12">
            If you invite an operative to this {type}, they will be given access
            to each drawing it contains. To remove the operative you will need
            to remove them from each drawing individually.
        </p>
    </div>
);

export default withRouter(OperativesAdd);
