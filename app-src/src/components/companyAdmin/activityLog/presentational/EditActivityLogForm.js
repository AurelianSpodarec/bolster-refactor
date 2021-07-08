import React from 'react';
import { Link } from 'react-router-dom';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const EditActivityLogForm = ({
    options,
    handleChange,
    checkIsSelected,
    handleSubmit,
    isPosting,
}) => {
    return (
        <Form onSubmit={handleSubmit}>
            {options.map(({ label, value, actionOptions }) => (
                <div key={value}>
                    <BlockHeading title={label} />
                    {actionOptions.map(action => {
                        return (
                            <Field
                                key={`${value}-${action.value}`}
                                name={action.label}
                                sizeClasses="size-lg-4"
                            >
                                <CheckboxContainer
                                    checked={checkIsSelected(value, action.value)}
                                    handleChange={() => handleChange(value, action.value)}
                                />
                            </Field>
                        );
                    })}
                </div>
            ))}

            <BlockButtonWrapper>
                <button
                    className={`button green ${isPosting ? 'disabled' : ''}`}
                    type="submit"
                    disabled={isPosting}
                >
                    {isPosting ? (
                        <i className="fa fa-spinner fa-spin" />
                    ) : (
                        <i className="fa fa-check" />
                    )}{' '}
                    Submit
                </button>
                <Link to="/company/activity-log" className="button">
                    Cancel
                </Link>
            </BlockButtonWrapper>
        </Form>
    );
};

export default EditActivityLogForm;
