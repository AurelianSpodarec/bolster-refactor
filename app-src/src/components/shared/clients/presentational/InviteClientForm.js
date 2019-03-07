import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Block from 'components/shared/generic/block/presentational/Block';

const InviteClientForm = ({ location }) => (
    <Block>
        <h3 className="heading heading-3">Invite client form</h3>
        <Link
            className="button"
            to={location.pathname.replace('/invite-client', '')}
        >
            Cancel
        </Link>
        <Link
            className="button"
            to={location.pathname.replace('/invite-client', '')}
        >
            Save
        </Link>
    </Block>
);

export default withRouter(InviteClientForm);
