import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';

const EditOptionValueForm = ({
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
                <Field name="Select services for this option value" required>
                    <div className="checkbox-list size-lg-12">
                        {serviceOptions.map((item, i) => (
                            <CheckboxContainer
                                key={i}
                                checked={serviceIDs.includes(item.value)}
                                handleChange={() => handleServiceChange(item.value)}
                                text={item.label}
                            />
                        ))}
                    </div>
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
    function handleServiceChange(id) {
        let newServiceIDs = serviceIDs !== null ? [...serviceIDs] : [];
        if (serviceIDs.includes(id)) {
            newServiceIDs = newServiceIDs.filter(sid => sid !== id);
        } else {
            newServiceIDs.push(id);
        }
        handleInputChange('serviceIDs', newServiceIDs);
    }
};
export default EditOptionValueForm;
