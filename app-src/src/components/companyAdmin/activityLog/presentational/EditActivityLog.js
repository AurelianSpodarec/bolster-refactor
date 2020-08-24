import React from 'react';

import { isEmpty } from 'helpers/generic';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { ACTIVITY_LOG_ACTION_VALUES } from 'constants/companyAdmin/enums';

const EditActivityLog = ({
    settings,
    isFetching,
    error,
    form,
    handleFormChange,
    handleSubmit,
    sections,
}) => (
    <BlockContainer isFetching={isFetching} error={error} isEmpty={isEmpty(settings)}>
        <BlockHeading title="Edit Activity Log Settings" />

        <Form handleSubmit={handleSubmit}>
            {sections.map(section => (
                <>
                    <BlockHeading title={section.name} />

                    {settings
                        .filter(setting => setting.referenceType === section.id)
                        .map((setting, index) => (
                            <Field
                                key={index}
                                name={ACTIVITY_LOG_ACTION_VALUES[setting.actionType]}
                                sizeClasses="size-lg-4"
                            >
                                <CheckboxContainer
                                    checked={form.test}
                                    handleChange={handleFormChange}
                                    name="test"
                                />
                            </Field>
                        ))}
                </>
            ))}

            <BlockButtonWrapper>
                <button className="button green" type="submit">
                    <i className="fa fa-check" /> Submit
                </button>
                {/* <button className="button" onClick={hideModal}>
                        <i className="fa fa-times" /> Close
                    </button> */}
            </BlockButtonWrapper>
        </Form>
    </BlockContainer>
);

export default EditActivityLog;
