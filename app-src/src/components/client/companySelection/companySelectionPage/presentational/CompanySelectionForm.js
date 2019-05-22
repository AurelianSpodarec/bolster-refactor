import React from 'react';

import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';

const CompanySelectionForm = ({
    handleSubmit,
    handleInputChange,
    companyOptions,
    selectedOption
}) => (
    <Form className="generic-form size-lg-12" onSubmit={handleSubmit}>
        <Field name="Select Company" sizeClasses="size-lg-4" required>
            <DropdownContainer />
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
