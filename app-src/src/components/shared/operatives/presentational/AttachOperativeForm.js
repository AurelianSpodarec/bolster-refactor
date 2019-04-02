import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const AttachOperativeForm = ({ handleSubmit }) => (
    <Form className="size-lg-12" onSubmit={handleSubmit}>
        <BlockButtonWrapper>
            <button className="button green">
                <i className="fa fa-plus" />
                Add Operative
            </button>
            <Link to={'/'} className="button">
                <i className="fa fa-times" /> Cancel
            </Link>
        </BlockButtonWrapper>
    </Form>
);

export default withRouter(AttachOperativeForm);
