import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import Select from 'components/shared/generic/form/presentational/Select';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';

const CreateOperativeAlertForm = ({
    handleSubmit,
    handleInputChange,
    message,
    operatives,
    siteID,
    allSites,
    filterOptions,
    filterOptionsVal,
    operativeIDs
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="Message" required>
                    <TextAreaContainer
                        name="message"
                        value={message}
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>
            <div className="size-lg-6">
                <Field name="Send to">
                    <Select
                        name="filterOptionsVal"
                        options={filterOptions}
                        value={filterOptionsVal}
                        onChange={handleInputChange}
                    />
                </Field>
            </div>
            <div className="size-lg-6">
                {filterOptionsVal === 1 && (
                    <Field name="Choose site">
                        <Select
                            name="siteID"
                            options={allSites}
                            value={siteID}
                            search
                            onChange={handleInputChange}
                        />
                    </Field>
                )}

                {filterOptionsVal === 2 && (
                    <Field name="Choose Operatives">
                        <MultiSelect
                            name={'operativeIDs'}
                            search
                            options={operatives}
                            onChange={handleInputChange}
                            value={operativeIDs}
                        />
                    </Field>
                )}
            </div>
        </div>
        <BlockButtonWrapper>
            <button className="button green">
                <i className="far fa-bell" /> Send Alert
            </button>
            <ButtonContainer to="/company/tools/operative-alerts">
                Cancel
            </ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);

export default CreateOperativeAlertForm;
