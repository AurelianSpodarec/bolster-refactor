import React from 'react';
import { Link } from 'react-router-dom';

import Block from 'components/shared/generic/block/presentational/Block';

const ChangeOwnershipForm = () => (
    <Block>
        <h3 className="heading heading-3">Change ownership form</h3>
        <Link className="button" to="/sites/1">
            Cancel
        </Link>
        <Link className="button" to="/sites/1">
            Save
        </Link>
    </Block>
);

export default ChangeOwnershipForm;
