import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';

const EditManufacturerForm = ({
    handleSubmit,
    handleInputChange,
    hideModal,
    buttonText,
    name,
    validateName,
    serviceOptions,
    serviceIDs,
}) => {
    return (
        <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
            <div className="size-lg-12">
                <div className="size-lg-6 size-md-12">
                    <Field name="Name" required>
                        <TextInputContainer
                            name="name"
                            value={name}
                            handleChange={handleInputChange}
                            validate={validateName}
                            required
                        />
                    </Field>
                </div>
            </div>

            <div className="size-lg-12">
                <Field name="Assign Services" required>
                    <CheckboxListContainer
                        name="serviceIDs"
                        handleChange={(name, value) => handleInputChange(name, value)}
                        selectedOptions={serviceIDs}
                        options={serviceOptions}
                        required
                    />

                    <CheckboxContainer
                        checked={serviceIDs.length === serviceOptions.length}
                        handleChange={() => handleToggleAll()}
                        text="Toggle All"
                        classes="margin-top"
                    />
                </Field>
            </div>

            <BlockButtonWrapper>
                <button className="button green">
                    <i className="fa fa-check" /> {buttonText}
                </button>
                <ButtonContainer handleClick={hideModal}>Cancel</ButtonContainer>
            </BlockButtonWrapper>
        </Form>
    );
    function handleToggleAll() {
        let newServiceIDs = serviceIDs.length ? [...serviceIDs] : [];

        if (serviceIDs.length === serviceOptions.length) {
            newServiceIDs = [];
        } else {
            newServiceIDs = serviceOptions.map(({ value }) => value.toString());
        }

        handleInputChange('serviceIDs', newServiceIDs);
    }
};
export default EditManufacturerForm;
