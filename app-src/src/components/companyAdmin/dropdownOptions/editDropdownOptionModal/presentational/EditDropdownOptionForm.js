import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';

const EditDropdownOptionForm = ({
    handleSubmit,
    handleInputChange,
    hideModal,
    name,
    validateName,
    subscribedServices,
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
                <Field name="Assign Services" required>
                    <div className="checkbox-list size-lg-12">
                        {subscribedServices.map((item, i) => (
                            <CheckboxContainer
                                key={i}
                                checked={serviceIDs !== null ? serviceIDs.includes(item.id) : false}
                                handleChange={() => handleServiceChange(item.id)}
                                text={item.name}
                            />
                        ))}

                        <CheckboxContainer
                            checked={serviceIDs.length === subscribedServices.length}
                            handleChange={() => handleToggleAll()}
                            text="Toggle All"
                        />
                    </div>
                </Field>
            </div>

            <BlockButtonWrapper>
                <button className="button green">
                    <i className="fa fa-check" /> Confirm Edit
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

    function handleToggleAll() {
        let newServiceIDs = serviceIDs.length ? [...serviceIDs] : [];

        if (serviceIDs.length === subscribedServices.length) {
            newServiceIDs = [];
        } else {
            newServiceIDs = subscribedServices.map(({ id }) => id);
        }

        handleInputChange('serviceIDs', newServiceIDs);
    }
};
export default EditDropdownOptionForm;
