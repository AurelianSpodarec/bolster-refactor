import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Block from 'components/shared/generic/block/presentational/Block';

const AttachOperativeForm = ({ location }) => (
    <Block>
        <h3 className="heading heading-3">Attach operative form</h3>
        <Link
            className="button"
            to={location.pathname.replace('/attach-operative', '')}
        >
            Cancel
        </Link>
        <Link
            className="button"
            to={location.pathname.replace('/attach-operative', '')}
        >
            Save
        </Link>
    </Block>
);

export default withRouter(AttachOperativeForm);
