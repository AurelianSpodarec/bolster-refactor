import React from 'react';
import { Link } from 'react-router-dom';

import Block from 'components/shared/generic/block/presentational/Block';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';

const ChangeOwnershipForm = ({
    companyCode,
    handleChange,
    handleSubmit,
    url
}) => (
    <Block>
        <Form className="generic-form" onSubmit={handleSubmit}>
            <h3 className="heading heading-3">Change ownership form</h3>
            <Field name="Company code">
                <TextInputContainer
                    value={companyCode}
                    name="companyCode"
                    handleChange={handleChange}
                    required
                />
            </Field>
            <p />
            <Link className="button" to={url.replace('/change-ownership', '')}>
                Cancel
            </Link>
            <button className="button" onClick={handleSubmit}>
                <i className="fa fa-save" />
                Save
            </button>
        </Form>
    </Block>
);

export default ChangeOwnershipForm;
