import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import Select from 'components/shared/generic/form/presentational/Select';
import ButtonWrapper from '../../../../shared/generic/button/presentational/ButtonWrapper';
import ActionButton from '../../../../shared/generic/button/presentational/ActionButton';

const EditCompanyOwnerModal = ({
    handleChange,
    handleSubmit,
    hideModal,
    form,
    userOptions,
    isPosting,
}) => {
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
