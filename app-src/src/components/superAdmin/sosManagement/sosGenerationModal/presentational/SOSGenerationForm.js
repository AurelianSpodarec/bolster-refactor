import React from 'react';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';

const sosGenerationForm = ({
    selectedCompany,
    handleChange,
    handleSubmit,
    companyOptions,
    isFetching,
    error
}) => {
    return (
        <BlockContainer
            heading="SOS Code Generation"
            error={error}
            isFetching={isFetching}
            isEmpty={!companyOptions.length}
        >
            <Form className="generic-form">
                <Field name="Generate SOS Code" htmlFor="add-credits">
                    <DropdownContainer
                        placeholder="-- select company --"
                        name="companyID"
                        options={companyOptions}
                        value={selectedCompany}
                        selectedOption={selectedCompany}
                        handleChange={handleChange}
                        required
                    />
                </Field>
                <BlockButtonWrapper>
                    <button className="button green" onClick={handleSubmit}>
                        Generate SOS Code
                    </button>
                </BlockButtonWrapper>
            </Form>
        </BlockContainer>
    );
};

export default sosGenerationForm;
