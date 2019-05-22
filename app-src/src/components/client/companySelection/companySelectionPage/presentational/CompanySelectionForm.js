import React from 'react';

// import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import Select from 'components/shared/generic/form/presentational/Select.js';

const CompanySelectionForm = ({
    handleSubmit,
    handleInputChange,
    companyOptions,
    selectedCompany
}) => (
    <Form className="generic-form size-lg-12" onSubmit={handleSubmit}>
        <Field name="Select Company" sizeClasses="size-lg-4" required>
            <Select
                required
                name="selectedCompany"
                search
                placeholder="--select company--"
                options={companyOptions}
                value={selectedCompany}
                onChange={handleInputChange}
            />
            {/* <TextInputContainer
                value={email}
                name="email"
                type="email"
                placeholder="Please enter your email"
                required
                handleChange={handleInputChange}
            /> */}
        </Field>

        <div className="button-area size-lg-12">
            <button className="button green" type="submit">
                Submit
            </button>
        </div>
    </Form>
);

export default CompanySelectionForm;
