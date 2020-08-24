import React from 'react';
import { Link } from 'react-router-dom';

import { ACTIVITY_LOG_ACTION_VALUES } from 'constants/companyAdmin/enums';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const EditActivityLogForm = ({ settings, form, handleFormChange, handleSubmit, sections }) => (
    <Form onSubmit={handleSubmit}>
        {sections.map(section => (
            <>
                <BlockHeading title={section.name} />

                {settings
                    .filter(setting => setting.referenceType === section.id)
                    .map((setting, index) => {
                        const name = `reference-${setting.referenceType}-action-${setting.actionType}`;

                        return (
                            <Field
                                key={index}
                                name={ACTIVITY_LOG_ACTION_VALUES[setting.actionType]}
                                sizeClasses="size-lg-4"
                            >
                                <CheckboxContainer
                                    checked={form[name]}
                                    handleChange={handleFormChange}
                                    name={name}
                                />
                            </Field>
                        );
                    })}
            </>
        ))}

        <BlockButtonWrapper>
            <button className="button green" type="submit">
                <i className="fa fa-check" /> Submit
            </button>
            <Link to="/company/activity-log" className="button">
                Cancel
            </Link>
        </BlockButtonWrapper>
    </Form>
);

export default EditActivityLogForm;
