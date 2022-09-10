import React from 'react';

import ModalOuterContainer from 'components_DEPRECATED/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components_DEPRECATED/shared/generic/form/containers/Form';
import Field from 'components_DEPRECATED/shared/generic/form/presentational/Field';
import Select from 'components_DEPRECATED/shared/generic/form/presentational/Select';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';

const EditCompanyOwnerModal = ({ handleChange, handleSubmit, hideModal, form, userOptions }) => {
    return (
        <ModalOuterContainer>
            <Form onSubmit={handleSubmit}>
                <Field name="Select the new owner" required>
                    <Select
                        singleSelect
                        name="companyUserID"
                        options={userOptions}
                        value={form.companyUserID}
                        onChange={handleChange}
                        omitPlaceholder
                        required
                        optionListClasses="large-list"
                    />
                </Field>
                <div className="size-lg-12">
                    <ButtonWrapper alignment="right">
                        <ActionButton
                            text="Cancel"
                            onClick={hideModal}
                            source="secondary"
                            size="small"
                        />
                        <ActionButton text="Confirm" type="submit" icon="check" size="small" />
                    </ButtonWrapper>
                </div>
            </Form>
        </ModalOuterContainer>
    );
};

export default EditCompanyOwnerModal;
