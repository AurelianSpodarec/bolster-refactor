import React from 'react';
import { Link } from 'react-router-dom';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';

const AddPinForm = ({ location, handleSubmit }) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <div className="size-lg-6">Add pin</div>
        </div>

        <BlockButtonWrapper>
            <button className="button green">
                <i className="fa fa-plus" /> Add Pin
            </button>
            <Link
                to={location.pathname.replace('/add-pin', '')}
                className="button"
            >
                Cancel
            </Link>
        </BlockButtonWrapper>
    </Form>
);

export default AddPinForm;
